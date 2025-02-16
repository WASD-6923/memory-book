<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { ref } from 'vue'
import { War } from '@/generated/graphqlOperations.js'
import router from '@/router/index.js'
import WarForm from '@/views/admin/wars/partials/WarForm.vue'

useTitle('Добавить данные вооруженного конфликта')
const war = ref<War>({
  name: undefined,
  start_date: undefined,
  end_date: undefined,
  description: undefined,
  reason: undefined,
  status: undefined,
})
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
        <div class="ml-2">
          <span>Добавить данные вооруженного конфликта</span>
        </div>
      </div>
    </template>
    <template #content>
      <WarForm
        :war="war"
        mode="create"
      />
    </template>
  </Card>
</template>

<style scoped></style>
