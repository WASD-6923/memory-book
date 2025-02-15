<script setup lang="ts">
import FloatingConfigurator from '@/components/FloatingConfigurator.vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useUserStore } from '@/stores/useUserStore.js'
import FieldError from '@/components/errors/FieldError.vue'
import Checkbox from 'primevue/checkbox'
import InputText from 'primevue/inputtext'
import { useI18n } from 'vue-i18n'
import LogoIcon from '@/components/LogoIcon.vue'
import { QueryLoginArgs } from '@/generated/graphqlOperations.js'

const { t } = useI18n()
const checked = ref(false)

const userStore = useUserStore()
const toast = useToast()
const router = useRouter()

const state = reactive<QueryLoginArgs>({
  input: {
    email: '',
    password: '',
  },
})

const handleLogin = async () => {
  try {
    console.log('1')
    const b = await userStore.login(state)
    console.log('after login', b)
    toast.add({
      severity: 'success',
      summary: 'Успех',
      detail: t('auth.success'),
      life: 3000,
    })
    console.log('push', userStore.user)
    await router.push({ name: 'dashboard' })
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <FloatingConfigurator />
  <div
    class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden"
  >
    <div class="flex flex-col items-center justify-center">
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%);
        "
      >
        <div
          class="w-full bg-surface-0 dark:bg-surface-900 py-10 px-8 sm:px-20"
          style="border-radius: 53px"
        >
          <div class="flex flex-col items-center mb-6 mt-4 gap-4">
            <RouterLink to="/">
              <LogoIcon />
            </RouterLink>
            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Добро пожаловать!</div>
            <span class="text-muted-color font-medium">Требуется авторизация</span>
          </div>

          <form @submit.prevent="handleLogin">
            <label
              for="email1"
              class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2"
              >Логин</label
            >

            <InputText
              id="email"
              v-model="state.input.email"
              aria-describedby="email-error"
              class="w-full md:w-[30rem] mb-8"
              placeholder="Email или номер телефона"
              type="text"
            />

            <label
              for="password1"
              class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2"
              >Пароль</label
            >
            <Password
              id="password1"
              v-model="state.input.password"
              :placeholder="t('auth.password')"
              :toggleMask="true"
              class="mb-4"
              fluid
              :feedback="false"
            ></Password>

            <FieldError
              field-name="email"
              class="mb-3"
            />

            <!--            <div class="flex items-center justify-between mt-2 mb-8 gap-8">
              <div class="flex items-center">
                <Checkbox
                  v-model="checked"
                  inputId="remember-me"
                  binary
                  class="mr-2"
                ></Checkbox>
                <label for="remember-me">{{ t('auth.rememberMe') }}</label>
              </div>
              <RouterLink :to="`/auth/forgot-password`">
                <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">{{
                  t('auth.forgotPassword')
                }}</span>
              </RouterLink>
            </div>-->
            <Button
              :label="t('auth.loginBtn')"
              type="submit"
              class="w-full mt-8"
              @click="handleLogin"
            ></Button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>
