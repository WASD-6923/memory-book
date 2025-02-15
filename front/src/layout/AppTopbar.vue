<script setup lang="ts">
import AppAccountDropdown from '@/layout/AppAccountDropdown.vue'
import AppNotifications from '@/layout/AppNotifications.vue'
import { useLayoutStore } from '@/stores/useLayoutStore.ts'
import LogoIcon from '@/components/LogoIcon.vue'
import AppConfigurator from '@/layout/AppConfigurator.vue'

const layoutStore = useLayoutStore()
</script>

<template>
  <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <button
        class="layout-menu-button layout-topbar-action"
        @click="layoutStore.menuToggle()"
      >
        <i class="pi pi-bars"></i>
      </button>
      <router-link
        to="/"
        class="layout-topbar-logo"
      >
        <LogoIcon />
        <!--        <span>AA-OREN</span>-->
      </router-link>
    </div>

    <div class="layout-topbar-actions">
      <AppNotifications />
      <div class="layout-config-menu">
        <button
          type="button"
          class="layout-topbar-action"
          @click="layoutStore.toggleDarkMode"
        >
          <i
            :class="[
              'pi',
              { 'pi-moon': layoutStore.layoutConfig.darkTheme, 'pi-sun': !layoutStore.layoutConfig.darkTheme },
            ]"
          ></i>
        </button>
        <div class="relative">
          <button
            v-styleclass="{
              selector: '@next',
              enterFromClass: 'hidden',
              enterActiveClass: 'animate-scalein',
              leaveToClass: 'hidden',
              leaveActiveClass: 'animate-fadeout',
              hideOnOutsideClick: true,
            }"
            type="button"
            class="layout-topbar-action layout-topbar-action-highlight"
          >
            <i class="pi pi-palette"></i>
          </button>
          <AppConfigurator />
        </div>
      </div>

<!--      <button
        class="layout-topbar-menu-button layout-topbar-action"
        v-styleclass="{
          selector: '@next',
          enterFromClass: 'hidden',
          enterActiveClass: 'animate-scalein',
          leaveToClass: 'hidden',
          leaveActiveClass: 'animate-fadeout',
          hideOnOutsideClick: true,
        }"
      >
        <i class="pi pi-ellipsis-v"></i>
      </button>-->
      <AppAccountDropdown />
    </div>
  </div>
</template>
<style scoped>
.layout-topbar .layout-topbar-logo svg {
  width: 5rem;
}
</style>
