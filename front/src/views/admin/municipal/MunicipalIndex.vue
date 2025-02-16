<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { onUnmounted, reactive, ref } from 'vue'
import { DataTablePageEvent, DataTableSortEvent } from 'primevue/datatable'
import {
  MunicipalColumns,
  MunicipalsQueryVariables,
  MunicipalType,
  SortOrder,
  useMunicipalsQuery,
  UserFilter,
} from '@/generated/graphqlOperations.js'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useErrorsStore } from '@/stores/useErrors.ts'
import MunicipalFilterPanel from '@/views/admin/municipal/partials/MunicipalFilterPanel.vue'

const errStore = useErrorsStore()
errStore.clearStore()
const route = useRoute()
const { t } = useI18n()
useTitle('Муниципальные образования')
const dt = ref()
const profiles = ref()
const paginator = ref({
  currentPage: 1,
  total: 0,
  perPage: 10,
})

const variables = reactive<MunicipalsQueryVariables>({
  first: paginator.value.perPage,
  page: 1,
  orderBy: [
    {
      column: MunicipalColumns.Name,
      order: SortOrder.Desc,
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
      column: event.sortField as MunicipalColumns,
      order: event.sortOrder == 1 ? SortOrder.Asc : SortOrder.Desc,
    },
  ]
}

const { onResult, loading, refetch } = useMunicipalsQuery(variables, {
  fetchPolicy: 'no-cache',
})

onResult((queryResult) => {
  if (queryResult.data) {
    profiles.value = queryResult.data?.municipals.data
    paginator.value = { ...queryResult.data.municipals.paginatorInfo }
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
        <div>Муниципальные образования</div>
        <Button
          icon="pi pi-user-plus"
          :label="t('common.add')"
          size="small"
          as="router-link"
          to="/admin/municipals/create"
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
        >
          <template #body="slotProps">
            <RouterLink :to="`/admin/municipals/update/${slotProps.data.id}`">
              <div class="text-primary">
                {{ slotProps.data.name }}
              </div>
            </RouterLink>
          </template>
        </Column>
        <Column header="Тип">
          <template #body="slotProps">
            {{ slotProps.data.type === MunicipalType.CityDistrict ? 'Городской округ' : 'Муниципальный район' }}
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
              :to="`municipals/update/${slotProps.data.id}`"
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
