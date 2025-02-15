<script setup lang="ts">
import { useTitle } from '@vueuse/core'
import UserForm from '@/views/admin/users/partials/UserForm.vue'
import router from '@/router/index.js'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
useTitle(t('user.create'))
</script>

<template>
  <Card>
    <template #title
      ><div class="flex flex-row align-items-center">
        <Button
          icon="pi pi-arrow-left"
          severity="primary"
          size="small"
          @click="router.go(-1)"
        />
        <div class="ml-2">{{ t('user.create') }}</div>
      </div></template
    >
    <template #content>
      <UserForm mode="create" />
    </template>
  </Card>
</template>

<style scoped></style>
