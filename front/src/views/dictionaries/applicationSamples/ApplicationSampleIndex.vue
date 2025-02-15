<script setup lang="ts">
import {
  ApplicationColumns,
  ApplicationSampleColumns,
  ApplicationSampleFilter,
  ApplicationSamplesQueryVariables,
  QueryApplicationSamplesOrderByOrderByClause,
  SortOrder,
  useApplicationSamplesQuery,
} from '@/generated/graphqlOperations.js'
import { computed, onUnmounted, reactive, ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { useErrorsStore } from '@/stores/useErrors.js'
import { DataTablePageEvent, DataTableSortEvent } from 'primevue/datatable'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useTitle } from '@vueuse/core'

const router = useRouter()
const { t } = useI18n()
const errStore = useErrorsStore()
errStore.clearStore()
const confirm = useConfirm()
const toast = useToast()

useTitle(t('applicationSample.name'))
const orderBy = ref<QueryApplicationSamplesOrderByOrderByClause>({
  column: ApplicationSampleColumns.AccessLevel,
  order: SortOrder.Desc,
})
const variables = reactive<ApplicationSamplesQueryVariables>({
  first: 10,
  page: 1,
  filter: {},
  orderBy: [orderBy.value],
})

const { result: applicationsResult, loading } = useApplicationSamplesQuery(variables, { fetchPolicy: 'no-cache' })
const models = computed(() => applicationsResult.value?.applicationSamples.data)
const total = computed(() => applicationsResult.value?.applicationSamples.paginatorInfo.total)

const handlePageChange = (event: DataTablePageEvent) => {
  variables.page = event.page + 1
  router.push({ query: { page: variables.page } })
}
const onHandleSort = (event: DataTableSortEvent) => {
  console.log(event)
  orderBy.value = {
    column: event.sortField as ApplicationColumns,
    order: event.sortOrder == 1 ? SortOrder.Asc : SortOrder.Desc,
  }
  variables.orderBy = [orderBy.value]
  router.push({ query: { sort: orderBy.value.column, order: orderBy.value.order } })
}

const handleApplyFilter = (filter: ApplicationSampleFilter) => {
  variables.filter = filter
  router.push({ query: variables.filter })
}
onUnmounted(() => {
  errStore.clearStore()
})
</script>

<template>
  <Card>
    <template #title>
      <div class="flex flex-row justify-between">
        <span>{{ t('applicationSample.name') }}</span>
      </div>
    </template>
    <template #content>
      <!--      <ApplicationFilterPanel @apply-filter="handleApplyFilter" />-->
      <DataTable
        :value="models"
        ref="dt"
        :loading="loading"
        lazy
        tableStyle="min-width: 75rem"
        striped-rows
        size="small"
        paginator
        :rows="10"
        :total-records="total"
        @page="handlePageChange"
        @sort="onHandleSort"
      >
        <Column
          :header="t('application.accessLevel')"
          sort-field="ACCESS_LEVEL"
          sortable
        >
          <template #body="slotProps">
            {{ t('realty.accessLevels.' + slotProps.data.access_level.toLowerCase()) }}
          </template>
        </Column>
        <Column
          field="name"
          :header="t('common.name')"
          sort-field="NAME_EN"
          sortable
        />
        <Column
          field="description"
          :header="t('common.description')"
          sort-field="NAME_EN"
          sortable
        />
        <Column
          :header="t('common.operations')"
          style="width: 10rem"
        >
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              raised
              rounded
              severity="success"
              as="router-link"
              :to="`application-samples/update/${slotProps.data.id}`"
            />
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>

<style scoped></style>
