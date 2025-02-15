<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/useUserStore.js'
import router from '@/router/index.js'

const userStore = useUserStore()
const items = ref([
  {
    label: 'Главная',
    icon: 'pi pi-home',
    url: '/',
  },
  {
    label: 'Группы',
    icon: 'pi pi-users',
    url: '/pages/groups',
  },
  {
    label: 'Контакты',
    icon: 'pi pi-envelope',
    url: '/pages/contacts',
  },
])
const handleSignOut = () => {
  userStore.logout()
  router.push({ name: 'root' })
}
</script>

<template>
  <ul class="list-none p-0 m-0 flex lg:items-center select-none flex-col lg:flex-row cursor-pointer gap-8">
    <li>
      <RouterLink
        class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl"
        to="/"
      >
        <span class="text-primary">Главная</span>
      </RouterLink>
    </li>
    <li v-if="userStore.isLoggedIn">
      <RouterLink
        class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl"
        to="/user/profile"
      >
        <span class="text-primary">Профиль пользователя</span>
      </RouterLink>
    </li>
    <li v-if="userStore.isLoggedIn">
      <RouterLink
        class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl"
        to="/admin/dashboard"
      >
        <span class="text-primary">Панель администратора</span>
      </RouterLink>
    </li>
  </ul>
  <div class="flex border-t lg:border-t-0 border-surface py-4 lg:py-0 mt-4 lg:mt-0 gap-2">
    <Button
      label="Выйти"
      @click="handleSignOut"
      rounded
      v-if="userStore.isLoggedIn"
    ></Button>
    <Button
      label="Войти"
      as="router-link"
      to="/auth/login"
      rounded
      v-if="!userStore.isLoggedIn"
    ></Button>
    <!--        <Button
      label="Register"
      to="/auth/login"
      rounded
    ></Button>-->
  </div>
</template>

<style scoped>
.p-menubar {
  border: none !important;
}
</style>
