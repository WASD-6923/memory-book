<script setup lang="ts">
import { onBeforeMount, PropType, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLayoutStore } from '@/stores/useLayoutStore.ts'
import { IMenuItem } from '@/layout/interfaces/IMenuItem.ts'
import { useI18n } from 'vue-i18n'
import {useUserStore} from "@/stores/useUserStore.js";

const { t } = useI18n()
const layoutStore = useLayoutStore()
const route = useRoute()
const userStore = useUserStore()

const props = defineProps({
  item: {
    type: Object as PropType<IMenuItem>,
    default: () => ({}),
  },
  index: {
    type: Number,
    default: 0,
  },
  root: {
    type: Boolean,
    default: true,
  },
  parentItemKey: {
    type: String,
    default: null,
  },
})

const isActiveMenu = ref(false)
const itemKey = ref(null)

onBeforeMount(() => {
  itemKey.value = props.parentItemKey ? props.parentItemKey + '-' + props.index : String(props.index)

  //const activeItem = layoutState.value.activeMenuItem
  const activeItem = layoutStore.layoutConfig.activeMenuItem

  isActiveMenu.value = activeItem === itemKey.value || activeItem ? activeItem.startsWith(itemKey.value + '-') : false
})

watch(
  //() => layoutState.value.activeMenuItem,
  () => layoutStore.layoutConfig.activeMenuItem,
  (newVal) => {
    isActiveMenu.value = newVal === itemKey.value || newVal.startsWith(itemKey.value + '-')
  },
)

function itemClick(event, item) {
  if (item.disabled) {
    event.preventDefault()
    return
  }

  if (
    (item.to || item.url) &&
    (layoutStore.layoutConfig.staticMenuMobileActive || layoutStore.layoutConfig.overlayMenuActive)
  ) {
    //onMenuToggle()
    layoutStore.menuToggle()
  }

  if (item.command) {
    item.command({ originalEvent: event, item: item })
  }

  //setActiveMenuItem(foundItemKey)
  layoutStore.layoutConfig.activeMenuItem = item.items
    ? isActiveMenu.value
      ? props.parentItemKey
      : itemKey
    : itemKey.value
}

function checkActiveRoute(item) {
  return route.path === item.to
}
</script>

<template>
  <li :class="{ 'layout-root-menuitem': root, 'active-menuitem': isActiveMenu }">
    <div
      v-if="root && item.visible !== false"
      class="layout-menuitem-root-text"
    >
      {{ t(item.label as string) }}
    </div>
    <a
      v-if="(!item.to || item.items) && item.visible !== false"
      :href="item.url"
      @click="itemClick($event, item, index)"
      :class="item.class"
      :target="item.target"
      tabindex="0"
    >
      <i
        :class="item.icon"
        class="layout-menuitem-icon"
      ></i>
      <span class="layout-menuitem-text">{{ t(item.label as string) }}</span>
      <i
        class="pi pi-fw pi-angle-down layout-submenu-toggler"
        v-if="item.items"
      ></i>
    </a>
    <router-link
      v-if="item.to && !item.items && item.visible !== false && userStore.can(item.permission)"
      @click="itemClick($event, item, index)"
      :class="[item.class, { 'active-route': checkActiveRoute(item) }]"
      tabindex="0"
      :to="item.to"
    >
      <i
        :class="item.icon"
        class="layout-menuitem-icon"
      ></i>
      <span class="layout-menuitem-text">{{ t(item.label as string) }}</span>
      <i
        class="pi pi-fw pi-angle-down layout-submenu-toggler"
        v-if="item.items"
      ></i>
    </router-link>
    <Transition
      v-if="item.items && item.visible !== false"
      name="layout-submenu"
    >
      <ul
        v-show="root ? true : isActiveMenu"
        class="layout-submenu"
      >
        <app-menu-item
          v-for="(child, i) in item.items"
          :key="child"
          :index="i"
          :item="child"
          :parentItemKey="itemKey"
          :root="false"
        ></app-menu-item>
      </ul>
    </Transition>
  </li>
</template>

<style lang="scss" scoped></style>
