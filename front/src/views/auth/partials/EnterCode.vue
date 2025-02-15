<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/useAuthStore.ts'
import { onUnmounted, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { AuthStage } from '@/generated/graphqlOperations.ts'

const toast = useToast()
const showTimer = ref(true)
const TIMEOUT = 10
const attempt = ref(0)
const timer = ref(TIMEOUT)
const timerInterval = ref()
const showAttempt = ref(false)
const { t } = useI18n()
const authStore = useAuthStore()

const makeTimer = () => {
  timer.value = TIMEOUT
  timerInterval.value = setInterval(function () {
    timer.value -= 1
    showTimer.value = true
    showAttempt.value = false
    if (timer.value <= 0) {
      if (timerInterval.value) {
        clearInterval(timerInterval.value)
      }
      console.log('Время истекло! Выполняем определенные действия.')
      showTimer.value = false
      showAttempt.value = true
    }
  }, 1000)
  return true
}

makeTimer()
const handleChangeOTP = async (event: any) => {
  authStore.error = false
  if (event.value.length === 4) {
    await authStore.loginWithCodeAndPhone()
  }
}
const handleGetCodeByPhone = async () => {
  attempt.value += 1
  if (attempt.value === 2) {
    if (timerInterval.value) {
      clearInterval(timerInterval.value)
    }
    showTimer.value = false
    authStore.phone = null
    authStore.provider = null
    authStore.code = null
    attempt.value = 0
    toast.add({
      severity: 'error',
      summary: t('common.error'),
      detail: t('auth.codeError'),
      life: 10000,
    })
    if (authStore.stage === AuthStage.Register) {
      authStore.authState = 'RegisterForm'
    } else {
      authStore.authState = 'LoginForm'
    }
    return
  }
  if (authStore.stage === AuthStage.Register) {
    await authStore.signUp()
  } else {
    await authStore.signIn()
  }
  //await authStore.getCodeByPhone()
  makeTimer()
}
onUnmounted(() => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
  }
})
</script>

<template>
  <div class="flex flex-col gap-8 items-center">
    <div class="text-center">
      {{ t('auth.weSentYouCode') }}
    </div>
    <InputOtp
      v-model="authStore.code"
      fluid
      integerOnly
      @change="handleChangeOTP"
    />
    <div
      class="text-sm text-red-500 text-center mt-4"
      v-if="authStore.error"
    >
      {{ t(authStore.errorMessage as string) }}
    </div>
    <p
      v-if="showTimer"
      class="text-13 text-grey text-center"
    >
      {{ t('auth.resendCode', { timer: timer }) }}
    </p>
    <p
      v-if="showAttempt"
      class="text-primary text-center cursor-pointer"
      @click="handleGetCodeByPhone"
    >
      {{ t('auth.getCodeAgain') }}
    </p>
  </div>
</template>

<style scoped></style>
