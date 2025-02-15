<script setup lang="ts">
import ElPhoneNumber from '@/components/ui/ElPhoneNumber.vue'
import { useI18n } from 'vue-i18n'
import { useLoginStore } from '@/stores/useLoginStore.ts'
import FieldError from '@/components/errors/FieldError.vue'

const { t } = useI18n()
const loginStore = useLoginStore()
const handleGetCodeByPhone = () => {
  loginStore.getCodeByPhone()
}
const loading = loginStore.loading
const updateCountryCode = (value: string) => {
  loginStore.countryCode = value
}
</script>

<template>
  <form @submit.prevent="handleGetCodeByPhone">
    <div class="flex flex-col gap-6 items-center">
      <div class="w-full">
        <ElPhoneNumber
          id="phone"
          v-model="loginStore.phone"
          :placeholder="t('auth.enterYourPhone')"
          @update-mask="updateCountryCode"
          required
          fluid
        />
        <FieldError field-name="phone" />
      </div>
      <div
        class="text-sm text-red-500 text-center"
        v-if="loginStore.error"
      >
        {{ loginStore.errorMessage }}
      </div>

      <Button
        class="w-full"
        icon="pi pi-check"
        :loading="loading"
        @click="handleGetCodeByPhone"
        :label="t('auth.loginBtn')"
      />
      <RouterLink
        :to="`/auth/login-pass`"
        class="text-primary"
        >{{ t('auth.loginWithPassword') }}</RouterLink
      >
    </div>
  </form>
</template>

<style scoped></style>
