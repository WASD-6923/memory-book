<script lang="ts" setup>
import { ref } from 'vue'
import { MunicipalFilter, MunicipalType } from '@/generated/graphqlOperations.ts'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { watchDebounced } from '@vueuse/core'
import { IMunicipalSelect } from '@/types/address/IMunicipalSelect.js'

const router = useRouter()
const { t } = useI18n()
const emit = defineEmits(['apply-filter'])

const filterParams = ref<MunicipalFilter>({
  search: undefined,
})

const handleApplyFilter = () => {
  router.push({ query: filterParams.value })
  emit('apply-filter', { ...filterParams.value })
}

watchDebounced(
  filterParams,
  () => {
    handleApplyFilter()
  },
  { deep: true, debounce: 500, maxWait: 1000 },
)

const handleClearFilter = () => {
  filterParams.value = {}
  router.push({ query: filterParams.value })
}
const types = ref<IMunicipalSelect[]>([
  {
    label: 'Городской округ',
    value: MunicipalType.CityDistrict,
  },
  {
    label: 'Муниципальный район',
    value: MunicipalType.Municipality,
  },
])
</script>

<template>
  <Fluid>
    <form @submit.prevent="handleApplyFilter">
      <div class="flex flex-col md:flex-row gap-8 mb-4">
        <div class="md:w-full">
          <div class="flex flex-col md:flex-row gap-4 mb-4">
            <div class="flex flex-wrap gap-2 w-full">
              <label>{{ t('filter.search') }}</label>
              <InputText v-model.trim="filterParams.search" />
            </div>
            <div class="flex flex-wrap gap-2 w-full">
              <label>Тип</label>
              <Select
                class="w-full"
                v-model="filterParams.type"
                :options="types"
                option-label="label"
                option-value="value"
              />
            </div>
          </div>
          <div class="flex flex-row gap-2 mt-4">
            <div>
              <Button
                :label="t('filter.apply')"
                size="small"
                @click="handleApplyFilter"
                type="submit"
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
    </form>
  </Fluid>
</template>

<style scoped></style>
