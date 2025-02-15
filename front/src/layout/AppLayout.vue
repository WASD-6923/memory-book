<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import AppFooter from '@/layout/AppFooter.vue'
import AppSidebar from '@/layout/AppSidebar.vue'
import AppTopbar from '@/layout/AppTopbar.vue'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import { useLayoutStore } from '@/stores/useLayoutStore.js'

const layoutStore = useLayoutStore()
const outsideClickListener = ref<((event: Event) => void) | null>(null)

watch(layoutStore.isSidebarActive, (newVal) => {
  if (newVal) {
    bindOutsideClickListener()
  } else {
    unbindOutsideClickListener()
  }
})

const containerClass = computed(() => {
  return {
    'layout-overlay': layoutStore.layoutConfig.menuMode === 'overlay',
    'layout-static': layoutStore.layoutConfig.menuMode === 'static',
    'layout-static-inactive':
      layoutStore.layoutConfig.staticMenuDesktopInactive && layoutStore.layoutConfig.menuMode === 'static',
    'layout-overlay-active': layoutStore.layoutConfig.overlayMenuActive,
    'layout-mobile-active': layoutStore.layoutConfig.staticMenuMobileActive,
  }
})

function bindOutsideClickListener() {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        layoutStore.resetMenu()
      }
    }
    document.addEventListener('click', outsideClickListener.value)
  }
}

function unbindOutsideClickListener() {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener.value)
    outsideClickListener.value = null
  }
}

function isOutsideClicked(event: Event): boolean {
  const sidebarEl = document.querySelector('.layout-sidebar')
  const topbarEl = document.querySelector('.layout-menu-button')

  if (!sidebarEl && !topbarEl) {
    // Если оба элемента отсутствуют, считается, что клик произошел "снаружи"
    return true
  }

  return !(
    (sidebarEl && (sidebarEl.isSameNode(event.target as Node) || sidebarEl.contains(event.target as Node))) ||
    (topbarEl && (topbarEl.isSameNode(event.target as Node) || topbarEl.contains(event.target as Node)))
  )
}
</script>

<template>
  <div
    class="layout-wrapper"
    :class="containerClass"
  >
    <AppTopbar></AppTopbar>
    <app-sidebar></app-sidebar>
    <div class="layout-main-container">
      <div class="layout-main">
        <router-view></router-view>
      </div>
      <app-footer></app-footer>
    </div>
    <div class="layout-mask animate-fadein"></div>
  </div>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
</template>
