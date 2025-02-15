<script setup lang="ts">
import FloatingConfigurator from '@/components/FloatingConfigurator.vue'
import { computed, onUnmounted } from 'vue'
import LogoIcon from '@/components/LogoIcon.vue'

import EnterPhone from '@/views/auth/partials/EnterPhone.vue'
import EnterCode from '@/views/auth/partials/EnterCode.vue'
import PhoneExists from '@/views/auth/partials/PhoneExists.vue'
import { useLoginStore } from '@/stores/useLoginStore.ts'
import { StateAuth } from '@/types/StateAuth.ts'

const loginStore = useLoginStore()

const AuthComponents: Record<StateAuth, typeof EnterPhone> = {
  EnterPhone: EnterPhone,
  EnterCode: EnterCode,
  PhoneExists: PhoneExists,
} as const

const componentLoader = () => {
  if (loginStore.stateAuth) {
    const key = loginStore.stateAuth
    return AuthComponents[key]
  }
}

if (loginStore.existPhone) {
  loginStore.stateAuth = 'PhoneExists'
}

onUnmounted(() => {
  loginStore.stateAuth = 'EnterPhone'
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
            <LogoIcon />
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
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>
