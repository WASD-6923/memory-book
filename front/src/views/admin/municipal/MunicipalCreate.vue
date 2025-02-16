<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { ref } from 'vue'
import { Municipal } from '@/generated/graphqlOperations.js'
import MunicipalForm from '@/views/admin/municipal/partials/MunicipalForm.vue'
import router from '@/router/index.js'

useTitle('Создание МО')
const municipal = ref<Municipal>({
  name: undefined,
  type: undefined,
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
          <span>Создание МО</span>
        </div>
      </div>
    </template>
    <template #content>
      <MunicipalForm
        :municipal="municipal"
        mode="create"
      />
    </template>
  </Card>
</template>

<style scoped></style>
