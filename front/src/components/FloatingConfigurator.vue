<script setup lang="ts">
import AppConfigurator from '@/layout/AppConfigurator.vue'
import { useLayoutStore } from '@/stores/useLayoutStore.js'
//import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

const layoutStore = useLayoutStore()
</script>

<template>
  <div class="fixed flex gap-4 top-8 right-8">
<!--    <LanguageSwitcher />-->
    <Button
      type="button"
      @click="layoutStore.toggleDarkMode"
      rounded
      :icon="layoutStore.layoutConfig.darkTheme ? 'pi pi-moon' : 'pi pi-sun'"
      severity="secondary"
    />
    <div class="relative">
      <Button
        icon="pi pi-palette"
        v-styleclass="{
          selector: '@next',
          enterFromClass: 'hidden',
          enterActiveClass: 'animate-scalein',
          leaveToClass: 'hidden',
          leaveActiveClass: 'animate-fadeout',
          hideOnOutsideClick: true,
        }"
        type="button"
        rounded
      />
      <AppConfigurator />
    </div>
  </div>
</template>
