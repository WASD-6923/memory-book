<script setup lang="ts">
import { useUserStore } from '@/stores/useUserStore.ts'
import { useLayoutStore } from '@/stores/useLayoutStore.js'

const layoutStore = useLayoutStore()
layoutStore.applyTheme()
const userStore = useUserStore()
if (userStore.accessToken !== undefined) {
  userStore.me()
  userStore.autoRefresh()
}
</script>

<template>
  <router-view />
</template>

<style scoped></style>
