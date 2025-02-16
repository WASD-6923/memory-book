<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { onUnmounted, reactive, ref } from 'vue'
import { DataTablePageEvent, DataTableSortEvent } from 'primevue/datatable'
import { SortOrder, UserFilter, useWarsQuery, WarColumns, WarsQueryVariables } from '@/generated/graphqlOperations.js'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useErrorsStore } from '@/stores/useErrors.ts'
import MunicipalFilterPanel from '@/views/admin/municipal/partials/MunicipalFilterPanel.vue'
import { useFormatDate } from '@/composables/useFormatDate.js'

const errStore = useErrorsStore()
errStore.clearStore()
const route = useRoute()
const { t } = useI18n()
useTitle('Вооруженные конфликты')
const dt = ref()
const profiles = ref()
const paginator = ref({
  currentPage: 1,
  total: 0,
  perPage: 10,
})

const variables = reactive<WarsQueryVariables>({
  first: paginator.value.perPage,
  page: 1,
  orderBy: [
    {
      column: WarColumns.Name,
      order: SortOrder.Asc,
    },
  ],
  filter: {
    search: route.query.search as string,
  },
})

const onPage = (event: DataTablePageEvent) => {
  variables.page = event.page + 1
  variables.first = event.rows
}
const onHandleSort = (event: DataTableSortEvent) => {
  variables.orderBy = [
    {
      column: event.sortField as WarColumns,
      order: event.sortOrder == 1 ? SortOrder.Asc : SortOrder.Desc,
    },
  ]
}

const { onResult, loading, refetch } = useWarsQuery(variables, {
  fetchPolicy: 'no-cache',
})

onResult((queryResult) => {
  if (queryResult.data) {
    profiles.value = queryResult.data?.wars.data
    paginator.value = { ...queryResult.data.wars.paginatorInfo }
    variables.page = paginator.value.currentPage
  }
})

const handleApplyFilter = (filter: UserFilter) => {
  variables.filter = filter
}
onUnmounted(() => {
  errStore.clearStore()
})
</script>

<template>
  <Card>
    <template #title>
      <div class="flex flex-row justify-between">
        <div>Вооруженные конфликты</div>
        <Button
          icon="pi pi-user-plus"
          :label="t('common.add')"
          size="small"
          as="router-link"
          to="/admin/wars/create"
        />
      </div>
    </template>
    <template #content>
      <MunicipalFilterPanel @apply-filter="handleApplyFilter" />
      <DataTable
        ref="dt"
        :loading="loading"
        :rows="paginator.perPage"
        :totalRecords="paginator.total"
        :value="profiles"
        dataKey="id"
        lazy
        paginator
        @page="onPage($event)"
        @sort="onHandleSort"
        :rowsPerPageOptions="[10, 20, 50, 100]"
        stripedRows
      >
        <Column
          field="name"
          header="Название"
          sortable
          sort-field="NAME"
        >
          <template #body="slotProps">
            <RouterLink :to="`/admin/wars/update/${slotProps.data.id}`">
              <div class="text-primary">
                {{ slotProps.data.name }}
              </div>
            </RouterLink>
          </template>
        </Column>
        <Column
          header="Дата начала"
          sortable
          sort-field="START_DATE"
        >
          <template #body="slotProps">
            {{ slotProps.data.start_date ? useFormatDate(slotProps.data.start_date) : '' }}
          </template>
        </Column>
        <Column
          header="Дата окончания"
          sortable
          sort-field="END_DATE"
        >
          <template #body="slotProps">
            {{ slotProps.data.end_date ? useFormatDate(slotProps.data.end_date) : '' }}
          </template>
        </Column>
        <Column
          header="Статус"
          sortable
          sort-field="STATUS"
        >
          <template #body="slotProps">
            {{ slotProps.data.status }}
          </template>
        </Column>
        <Column
          :header="t('common.operations')"
          style="width: 10rem"
        >
          <template #body="slotProps">
            <Button
              icon="pi pi-user-edit"
              raised
              rounded
              severity="success"
              as="router-link"
              :to="`wars/update/${slotProps.data.id}`"
            />
            <Button
              icon="pi pi-trash"
              raised
              rounded
              severity="danger"
              class="ml-2"
            />
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>

<style scoped></style>
