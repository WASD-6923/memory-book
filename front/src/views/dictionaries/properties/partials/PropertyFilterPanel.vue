<script lang="ts" setup>
import { computed, ref } from 'vue'
import { PropertyFilter } from '@/generated/graphqlOperations.ts'
import { useI18n } from 'vue-i18n'
import { watchDebounced } from '@vueuse/core'
import { usePropertyTypeNames } from '@/composables/properties/usePropertyTypeNames.ts'
import { IEnumObject } from '@/types/IEnumObject.ts'

const { t } = useI18n()
const emit = defineEmits(['apply-filter'])
const filterParams = ref<PropertyFilter>({
  name: undefined,
  types: undefined,
})

const propertyTypes = computed(() =>
  usePropertyTypeNames.map((pt: IEnumObject) => ({
    value: pt.value,
    label: t(pt.label),
  })),
)
watchDebounced(
  filterParams,
  () => {
    console.log('changed!')
    handleApplyFilter()
  },
  { deep: true, debounce: 500, maxWait: 1000 },
)
const handleApplyFilter = () => {
  emit('apply-filter', { ...filterParams.value })
}
const handleClearFilter = () => {
  filterParams.value = {
    name: undefined,
    types: undefined,
  }
}
</script>

<template>
  <Fluid>
    <form @submit.prevent="handleApplyFilter">
      <div class="flex flex-col md:flex-row gap-4 mb-4">
        <div class="md:w-full">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex flex-wrap gap-2 w-full">
              <label for="name1">{{ t('common.name') }}</label>
              <InputText
                v-model.trim="filterParams.name"
                class="w-2/3"
              />
            </div>
            <div class="flex flex-wrap gap-2 w-full">
              <label>{{ t('filter.propertyTypes') }}</label>
              <MultiSelect
                class="w-full"
                v-model="filterParams.types"
                :options="propertyTypes"
                option-label="label"
                option-value="value"
              />
            </div>
          </div>
          <div class="flex flex-row gap-2 mt-4">
            <div class="flex flex-row gap-2">
              <div>
                <Button
                  :label="t('filter.apply')"
                  size="small"
                  @click="handleApplyFilter"
                ></Button>
              </div>
              <div>
                <Button
                  :label="t('filter.clear')"
                  severity="secondary"
                  size="small"
                  @click="handleClearFilter"
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </Fluid>
</template>

<style scoped></style>
