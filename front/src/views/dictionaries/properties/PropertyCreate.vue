<script setup lang="ts">
import { useTitle } from '@vueuse/core'
import router from '@/router/index.js'
import { useI18n } from 'vue-i18n'
import PropertyForm from '@/views/dictionaries/properties/partials/PropertyForm.vue'

const { t } = useI18n()
useTitle(t('property.create'))
</script>

<template>
  <Card>
    <template #title>
      <div class="flex flex-row align-items-center">
        <Button
          icon="pi pi-arrow-left"
          severity="primary"
          size="small"
          @click="router.go(-1)"
        />
        <div class="ml-2">{{ t('property.create') }}</div>
      </div>
    </template>
    <template #content>
      <PropertyForm mode="create" />
    </template>
  </Card>
</template>

<style scoped></style>
