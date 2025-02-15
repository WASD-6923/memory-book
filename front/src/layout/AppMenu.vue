<script setup lang="ts">
import AppMenuItem from '@/layout/AppMenuItem.vue'
import adminMenus from './menus/adminMenus.js'
import { computed } from 'vue'
import { useUserStore } from '@/stores/useUserStore.ts'

const authUser = useUserStore()
</script>

<template>
  <ul class="layout-menu mb-8">
    <template
      v-for="(item, i) in adminMenus"
      :key="item"
    >
      <AppMenuItem
        v-if="!item.separator"
        :index="i"
        :item="item"
      ></AppMenuItem>
      <li
        v-if="item.separator"
        class="menu-separator"
      ></li>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
