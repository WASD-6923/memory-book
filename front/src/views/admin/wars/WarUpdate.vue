<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { computed } from 'vue'
import { useRouteParams } from '@vueuse/router'
import { useWarQuery, War } from '@/generated/graphqlOperations.js'
import router from '@/router/index.js'
import WarForm from '@/views/admin/wars/partials/WarForm.vue'

useTitle('Редактирование данных вооруженного конфликта')
const modelId = useRouteParams('id')

const { result, loading } = useWarQuery({ id: modelId.value as string }, { fetchPolicy: 'no-cache' })

const war = computed(() => result.value?.war as War)
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
          <span
            >Редактирование данных вооруженного конфликта: <small>#{{ war?.name }}</small></span
          >
        </div>
      </div>
    </template>
    <template #content>
      <WarForm
        v-if="!loading"
        :war="war"
        :id="modelId as string"
      />
    </template>
  </Card>
</template>

<style scoped></style>
