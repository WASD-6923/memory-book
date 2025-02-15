<script setup lang="ts">
import LogoIcon from '@/components/LogoIcon.vue'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import AppTopMenu from '@/layout/AppTopMenu.vue'
import { useLayoutStore } from '@/stores/useLayoutStore.js'
import AppFooter from "@/layout/AppFooter.vue";

const layoutStore = useLayoutStore()
</script>

<template>
  <div class="bg-surface-0 dark:bg-surface-900">
    <div
      id="home"
      class="landing-wrapper overflow-hidden flex flex-col min-h-screen"
    >
      <div class="py-6 px-6 mx-6 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static">
        <RouterLink
          class="flex items-center mr-20"
          to="/"
        >
          <LogoIcon />
        </RouterLink>
        <button
          type="button"
          class="layout-topbar-action lg:hidden"
          @click="layoutStore.toggleDarkMode"
        >
          <i
            :class="[
              'pi',
              { 'pi-moon': layoutStore.layoutConfig.darkTheme, 'pi-sun': !layoutStore.layoutConfig.darkTheme },
            ]"
          ></i>
        </button>
        <Button
          class="lg:!hidden"
          text
          severity="secondary"
          rounded
          v-styleclass="{
            selector: '@next',
            enterFromClass: 'hidden',
            enterActiveClass: 'animate-scalein',
            leaveToClass: 'hidden',
            leaveActiveClass: 'animate-fadeout',
            hideOnOutsideClick: true,
          }"
        >
          <i class="pi pi-bars !text-2xl"></i>
        </Button>
        <div
          class="items-center bg-surface-0 dark:bg-surface-900 grow justify-between hidden lg:flex absolute lg:static w-full left-0 top-full px-12 lg:px-0 z-20 rounded-border"
        >
          <AppTopMenu />
        </div>
        <button
          type="button"
          class="layout-topbar-action hidden lg:flex md: ml-8"
          @click="layoutStore.toggleDarkMode"
        >
          <i
            :class="[
              'pi',
              { 'pi-moon': layoutStore.layoutConfig.darkTheme, 'pi-sun': !layoutStore.layoutConfig.darkTheme },
            ]"
          ></i>
        </button>
      </div>

      <div class="flex-grow">
        <RouterView></RouterView>
      </div>

      <AppFooter />
    </div>
  </div>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
</template>
