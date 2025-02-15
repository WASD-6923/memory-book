<script setup lang="ts">
import FloatingConfigurator from '@/components/FloatingConfigurator.vue'
import { computed, onMounted, watch } from 'vue'
import LogoIcon from '@/components/LogoIcon.vue'
import { AuthComponents, useAuthStore } from '@/stores/useAuthStore.ts'
import { useRoute } from 'vue-router'
import { AuthStage } from '@/generated/graphqlOperations.ts'
import { useErrorsStore } from '@/stores/useErrors.ts'

const errorStore = useErrorsStore()
const authStore = useAuthStore()
const route = useRoute()
console.log(route.name)

watch(
  () => route.name,
  (newName) => {
    authStore.authState = newName === 'signIn' ? 'LoginForm' : 'RegisterForm'
    authStore.stage = newName === 'signIn' ? AuthStage.Login : AuthStage.Register
    errorStore.$reset()
  },
)
const componentLoader = () => {
  if (authStore.authState) {
    const key = authStore.authState
    return AuthComponents[key]
  }
}

onMounted(() => {
  authStore.authState = route.name === 'signIn' ? 'LoginForm' : 'RegisterForm'
})

const componentLoaderInit = computed(() => componentLoader())
</script>

<template>
  <Toast />
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
          class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20 min-h-80"
          style="border-radius: 53px; min-height: 320px"
        >
          <div class="flex flex-col items-center mb-8">
            <RouterLink to="/">
              <LogoIcon />
            </RouterLink>
          </div>

          <div class="md:w-[20rem]">
            <component :is="componentLoaderInit" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
