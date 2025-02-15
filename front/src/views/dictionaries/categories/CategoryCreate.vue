<script setup lang="ts">
import { useTitle } from '@vueuse/core'
import router from '@/router/index.js'
import CategoryForm from '@/views/dictionaries/categories/partials/CategoryForm.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
useTitle(t('categories.create'))
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
        <div class="ml-2">{{ t('categories.create') }}</div>
      </div></template
    >
    <template #content>
      <CategoryForm mode="create" />
    </template>
  </Card>
</template>

<style scoped></style>
