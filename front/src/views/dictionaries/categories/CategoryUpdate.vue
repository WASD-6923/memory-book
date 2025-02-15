<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { computed } from 'vue'
import { useRouteParams } from '@vueuse/router'
import { useCategoryQuery } from '@/generated/graphqlOperations.js'
import router from '@/router/index.js'
import CategoryForm from '@/views/dictionaries/categories/partials/CategoryForm.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
useTitle(t('categories.update'))
const modelId = useRouteParams('id')

const { result, loading } = useCategoryQuery({ id: modelId.value as string }, { fetchPolicy: 'no-cache' })

const model = computed(() => result.value?.category)
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
            >{{ t('categories.update') }} <small>#{{ model?.name }}</small></span
          >
        </div>
      </div>
    </template>
    <template #content>
      <CategoryForm
        v-if="!loading"
        v-model="model"
        :id="modelId as string"
        mode="update"
      />
    </template>
  </Card>
</template>

<style scoped></style>
