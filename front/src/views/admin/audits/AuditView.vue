<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { ref } from 'vue'
import { useRouteParams } from '@vueuse/router'
import { Audit, useAuditQuery } from '@/generated/graphqlOperations.js'
import router from '@/router/index.js'

useTitle('Просмотр данных воина')
const modelId = useRouteParams('id')

const audit = ref<Audit>()
const newValue = ref()
const oldValue = ref()
const { onResult, loading } = useAuditQuery({ id: modelId.value as string }, { fetchPolicy: 'no-cache' })
onResult((result) => {
  console.log(result)
  audit.value = result.data?.audit as Audit
  newValue.value = JSON.stringify(result.data?.audit?.new_values, null, 2)
  oldValue.value = JSON.stringify(result.data?.audit?.old_values, null, 2)
})
</script>

<template>
  <Card v-if="!loading">
    <template #title>
      <div class="flex flex-row align-items-center">
        <Button
          icon="pi pi-arrow-left"
          severity="primary"
          size="small"
          @click="router.go(-1)"
        />
        <div class="ml-2">
          <span
            >Просмотр изменений воина:
            <small
              >#{{ audit?.auditable?.last_name }} {{ audit?.auditable?.first_name }}
              {{ audit?.auditable?.middle_name }}</small
            ></span
          >
        </div>
      </div>
    </template>
    <template #content>
      <div class="text-primary">Было</div>
      <div class="text-secondary">{{ oldValue }}</div>
      <div class="text-primary">Стало</div>
      <div class="text-secondary">{{ newValue }}</div>
    </template>
  </Card>
</template>

<style scoped></style>
