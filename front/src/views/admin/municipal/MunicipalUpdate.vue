<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { computed } from 'vue'
import { useRouteParams } from '@vueuse/router'
import { Municipal, useMunicipalQuery } from '@/generated/graphqlOperations.js'
import router from '@/router/index.js'
import MunicipalForm from '@/views/admin/municipal/partials/MunicipalForm.vue'

useTitle('Редактирование МО')
const modelId = useRouteParams('id')

const { result, loading } = useMunicipalQuery({ id: modelId.value as string }, { fetchPolicy: 'no-cache' })

const municipal = computed(() => result.value?.municipal as Municipal)
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
            >Редактирование МО: <small>#{{ municipal?.name }}</small></span
          >
        </div>
      </div>
    </template>
    <template #content>
      <MunicipalForm
        v-if="!loading"
        :municipal="municipal"
        :id="modelId as string"
      />
    </template>
  </Card>
</template>

<style scoped></style>
