<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { computed } from 'vue'
import { useRouteParams } from '@vueuse/router'
import { usePropertyQuery } from '@/generated/graphqlOperations.js'
import router from '@/router/index.js'
import { useI18n } from 'vue-i18n'
import PropertyForm from '@/views/dictionaries/properties/partials/PropertyForm.vue'

const { t, locale } = useI18n()
console.log(locale.value)
useTitle(t('realty.update'))
const modelId = useRouteParams('id')

const { result, loading } = usePropertyQuery({ id: modelId.value as string }, { fetchPolicy: 'no-cache' })

const model = computed(() => result.value?.property)
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
            >{{ t('applicationSample.update') }} <small>#{{ model?.name }}</small></span
          >
        </div>
      </div>
    </template>
    <template #content>
      <PropertyForm
        v-if="!loading"
        v-model="model"
        :id="modelId as string"
      />
    </template>
  </Card>
</template>

<style scoped></style>
