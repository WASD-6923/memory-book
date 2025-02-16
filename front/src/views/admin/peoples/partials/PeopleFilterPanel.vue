<script lang="ts" setup>
import { computed, ref } from 'vue'
import { MunicipalColumns, PeopleFilter, SortOrder, useMunicipalsQuery } from '@/generated/graphqlOperations.ts'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { watchDebounced } from '@vueuse/core'

const router = useRouter()
const { t } = useI18n()
const emit = defineEmits(['apply-filter'])

const filterParams = ref<PeopleFilter>({
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

const { result } = useMunicipalsQuery({
  first: 100,
  page: 1,
  orderBy: [
    {
      column: MunicipalColumns.Name,
      order: SortOrder.Asc,
    },
  ],
})
const municipals = computed(() => result.value?.municipals.data.map((item) => ({ label: item.name, value: item.id })))
</script>

<template>
  <Fluid>
    <form @submit.prevent="handleApplyFilter">
      <div class="flex flex-col md:flex-row gap-8 mb-4">
        <div class="md:w-full">
          <div class="flex flex-col md:flex-row gap-4 mb-4">
            <div class="flex flex-wrap gap-2 w-full">
              <label>Поиск (ФИО)</label>
              <InputText v-model.trim="filterParams.search" />
            </div>
            <div class="flex flex-wrap gap-2 w-full">
              <label>Муниципалитет</label>
              <Select
                class="w-full"
                v-model="filterParams.municipal_id"
                :options="municipals"
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
