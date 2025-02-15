<script setup lang="ts">
import FieldError from '@/components/errors/FieldError.vue'
import InputText from 'primevue/inputtext'
import { useAuthStore } from '@/stores/useAuthStore.ts'
import { useI18n } from 'vue-i18n'
import { AuthStage } from '@/generated/graphqlOperations.js'

const { t } = useI18n()
const authStore = useAuthStore()
authStore.stage = AuthStage.Login

const handleSignIn = () => {
  authStore.signIn()
}
</script>

<template>
  <form
    @submit.prevent="handleSignIn"
    autocomplete="off"
  >
    <label
      for="email"
      class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2"
      >{{ t('auth.loginEmail') }}</label
    >

    <InputText
      id="email"
      v-model="authStore.email"
      aria-describedby="email-error"
      class="w-full"
      :placeholder="t('auth.login')"
      type="text"
    />
    <FieldError
      field-name="input.email"
      class="mb-3"
    />

    <label
      for="vilanova-password"
      class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2"
      >{{ t('auth.password') }}</label
    >
    <Password
      id="vilanova-password"
      v-model="authStore.password"
      :placeholder="t('auth.password')"
      :toggleMask="true"
      class="mb-4"
      fluid
      :feedback="false"
      autocomplete="vilanova-passwd"
    >
    </Password>

    <FieldError
      field-name="input.password"
      class="mb-3"
    />
    <div
      class="text-sm text-red-600 text-center"
      v-if="authStore.error"
    >
      {{ t(authStore.errorMessage as string) }}
    </div>

    <div class="flex items-center justify-center mt-2 gap-8">
      <RouterLink
        :to="`/auth/sign-up`"
        class="text-primary text-center font-medium"
      >
        {{ t('auth.noLogin') }}
      </RouterLink>
    </div>
    <Button
      :label="t('auth.login')"
      type="submit"
      class="w-full mt-8"
      @click="handleSignIn"
    ></Button>
  </form>
</template>

<style scoped></style>
