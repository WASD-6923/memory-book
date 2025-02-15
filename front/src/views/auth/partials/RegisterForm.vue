<script setup lang="ts">
import FieldError from '@/components/errors/FieldError.vue'
import InputText from 'primevue/inputtext'
import ElPhoneNumber from '@/components/ui/ElPhoneNumber.vue'
import { useAuthStore } from '@/stores/useAuthStore.ts'
import { useI18n } from 'vue-i18n'
import { AuthStage } from '@/generated/graphqlOperations.js'

const { t } = useI18n()
const authStore = useAuthStore()
authStore.stage = AuthStage.Register

const handleSignUp = () => {
  authStore.signUp()
}
const updateCountryCode = (value: string) => {
  authStore.countryCode = value
}
</script>

<template>
  <form
    @submit.prevent="handleSignUp"
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
      :feedback="true"
      autocomplete="vilanova-passwd"
    >
      <template #header>
        <div class="font-semibold text-xm mb-4">{{ t('password.pick') }}</div>
      </template>
      <template #footer>
        <Divider />
        <ul class="pl-2 ml-2 my-0 leading-normal">
          <li>{{ t('password.lowercase') }}</li>
          <li>{{ t('password.uppercase') }}</li>
          <li>{{ t('password.numeric') }}</li>
          <li>{{ t('password.minimum') }}</li>
          <li>{{ t('password.symbol') }}</li>
        </ul>
      </template>
    </Password>

    <FieldError
      field-name="input.password"
      class="mb-3"
    />

    <label
      for="phone"
      class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2"
      >{{ t('auth.phone') }}</label
    >
    <ElPhoneNumber
      id="phone"
      v-model="authStore.phone"
      :placeholder="t('auth.enterYourPhone')"
      @update-mask="updateCountryCode"
      required
      fluid
    />

    <FieldError
      field-name="input.phone"
      class="mb-3"
    />

    <div class="flex items-center justify-center mt-2 gap-8">
      <RouterLink :to="`/auth/sign-in`" class="text-center text-primary font-medium">
        {{ t('auth.hasLogin') }}
      </RouterLink>
    </div>
    <Button
      :label="t('auth.register')"
      type="submit"
      class="w-full mt-8"
      @click="handleSignUp"
    ></Button>
  </form>
</template>

<style scoped></style>
