<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/useUserStore.ts'
import router from '@/router/index.js'
import { useI18n } from 'vue-i18n'
import { useCapitalize } from '@/composables/useCapitalize.ts'
import { useWindowSize } from '@vueuse/core'

const userStore = useUserStore()

const { t } = useI18n()
const menu = ref()
const userItems = [
  //{ label: 'user.profile', icon: 'pi pi-user', route: '/profile' },
  //{ label: 'auth.myApplication', icon: 'pi pi-id-card', route: '/user/applications' },
  { label: 'auth.admin', icon: 'pi pi-home', route: '/admin' },
  { separator: true },
]
const adminItems = [
  { label: 'user.profile', icon: 'pi pi-user', route: '/user/profile' },
  { label: 'auth.admin', icon: 'pi pi-home', route: '/admin' },
  { separator: true },
]
const items = computed(() => (userStore.isAdmin ? adminItems : userItems))
const roleName = computed(() => (userStore.user?.roles ? useCapitalize(userStore.user?.roles[0]?.title) : ''))
const toggle = (event: Event) => {
  menu.value.toggle(event)
}

const signOutClick = () => {
  userStore.logout()
  menu.value.hide()
  router.push({ name: 'root' })
}
const { width } = useWindowSize()
</script>

<template>
  <button
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
  </button>
  <div
    class="layout-topbar-menu hidden lg:block"
    v-if="width < 992"
  >
    <div class="layout-topbar-menu-content">
      <Menu
        ref="menu"
        :model="items"
        :popup="false"
      >
        <template #item="{ item, props }">
          <router-link
            v-if="item.route"
            v-slot="{ href, navigate }"
            :to="item.route"
            custom
          >
            <a
              v-ripple
              :href="href"
              v-bind="props.action"
              @click="navigate"
            >
              <span :class="item.icon" />
              <span class="ml-2">{{ t(item.label as string) }}</span>
            </a>
          </router-link>
          <a
            v-else
            v-ripple
            :href="item.url"
            :target="item.target"
            v-bind="props.action"
          >
            <span :class="item.icon" />
            <span class="ml-2">{{ t(item.label as string) }}</span>
          </a>
        </template>
        <template #end>
          <button
            class="w-full p-link flex items-center p-2 pl-4 text-color hover:surface-200 border-noround"
            @click="signOutClick"
          >
            <i class="pi pi-sign-out" />
            <span class="ml-2">{{ t('auth.logout') }}</span>
          </button>
        </template>
      </Menu>
    </div>
  </div>
  <div
    class="flex flex-row gap-4 items-center cursor-pointer"
    @click="toggle"
    v-else
  >
    <Avatar
      v-if="userStore.user?.avatar"
      :image="userStore.avatarImage as string"
      class="mt-1"
      shape="circle"
      size="large"
    />
    <img
      v-else
      alt="logo"
      src="/demo/images/avatar/empty.png"
      class="w-8"
    />
    <div class="flex flex-col text-center">
      <div class="font-bold">
        {{ userStore.user?.phone }}
      </div>
      <div class="">
        {{ roleName }}
      </div>
    </div>
    <i class="pi pi-angle-down" />
  </div>
  <Menu
    ref="menu"
    :model="items"
    :popup="true"
  >
    <template #item="{ item, props }">
      <router-link
        v-if="item.route"
        v-slot="{ href, navigate }"
        :to="item.route"
        custom
      >
        <a
          v-ripple
          :href="href"
          v-bind="props.action"
          @click="navigate"
        >
          <span :class="item.icon" />
          <span class="ml-2">{{ t(item.label as string) }}</span>
        </a>
      </router-link>
      <a
        v-else
        v-ripple
        :href="item.url"
        :target="item.target"
        v-bind="props.action"
      >
        <span :class="item.icon" />
        <span class="ml-2">{{ t(item.label as string) }}</span>
      </a>
    </template>
    <template #end>
      <button
        class="w-full p-link flex items-center p-2 pl-4 text-color hover:surface-200 border-noround"
        @click="signOutClick"
      >
        <i class="pi pi-sign-out" />
        <span class="ml-2">{{ t('auth.logout') }}</span>
      </button>
    </template>
  </Menu>
  <Toast />
</template>

<style scoped></style>
