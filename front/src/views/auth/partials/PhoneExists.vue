<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useStorage } from '@vueuse/core'
import { useLoginStore } from '@/stores/useLoginStore.ts'

const loginStore = useLoginStore()
const { t } = useI18n()
const phone = useStorage('phone', null)
const handleAnotherAccount = () => {
  loginStore.clearPhone()
  loginStore.stateAuth = 'EnterPhone'
}
const handleUseExistsPhone = () => {
  //loginStore.clearPhone()
  loginStore.phone = phone.value
  loginStore.getCodeByPhone()
}
</script>

<template>
  <div class="flex flex-col gap-8 items-center">
    <div class="text-2xl text-primary-400 text-center">{{ t('auth.isThisYourAccount') }}</div>
    <div
      class="flex flex-row gap-4 items-center justify-center border bg-surface-50 rounded-3xl py-2 px-4 cursor-pointer"
      @click="handleUseExistsPhone"
    >
      <i
        class="pi pi-phone text-primary"
        style="font-size: 1.5rem"
      ></i>
      <div class="text-3xl text-primary">{{ phone }}</div>
    </div>
    <Button
      class="w-full"
      @click="handleUseExistsPhone"
      severity="info"
      >{{ t('auth.loginAgain') }}</Button
    >
    <Button
      class="w-full"
      @click="handleAnotherAccount"
      >{{ t('auth.loginToAnotherAccount') }}</Button
    >
    <RouterLink
      :to="`/auth/login-pass`"
      class="text-primary"
      >{{ t('auth.loginWithPassword') }}</RouterLink
    >
  </div>
</template>

<style scoped></style>
