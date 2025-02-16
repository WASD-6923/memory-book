<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { onUnmounted, reactive, ref } from 'vue'
import { DataTablePageEvent, DataTableSortEvent } from 'primevue/datatable'
import {
  MunicipalType,
  PeopleColumns,
  PeoplesQueryVariables,
  SortOrder,
  usePeoplesQuery,
  UserFilter,
} from '@/generated/graphqlOperations.js'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useErrorsStore } from '@/stores/useErrors.ts'
import PeopleFilterPanel from '@/views/admin/peoples/partials/PeopleFilterPanel.vue'
import {useFormatDate} from "../../../composables/useFormatDate.js";

const errStore = useErrorsStore()
errStore.clearStore()
const route = useRoute()
const { t } = useI18n()
useTitle('Жители')
const dt = ref()
const profiles = ref()
const paginator = ref({
  currentPage: 1,
  total: 0,
  perPage: 10,
})

const variables = reactive<PeoplesQueryVariables>({
  first: paginator.value.perPage,
  page: 1,
  orderBy: [
    {
      column: PeopleColumns.LastName,
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
      column: event.sortField as PeopleColumns,
      order: event.sortOrder == 1 ? SortOrder.Asc : SortOrder.Desc,
    },
  ]
}

const { onResult, loading, refetch } = usePeoplesQuery(variables, {
  fetchPolicy: 'no-cache',
})

onResult((queryResult) => {
  if (queryResult.data) {
    profiles.value = queryResult.data?.peoples.data
    paginator.value = { ...queryResult.data.peoples.paginatorInfo }
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
        <div>Жители</div>
        <Button
          icon="pi pi-user-plus"
          :label="t('common.add')"
          size="small"
          as="router-link"
          to="/admin/peoples/create"
        />
      </div>
    </template>
    <template #content>
      <PeopleFilterPanel @apply-filter="handleApplyFilter" />
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
          header="ФИО"
        >
          <template #body="slotProps">
            <RouterLink :to="`/admin/peoples/update/${slotProps.data.id}`">
              <div class="text-primary">
                {{ slotProps.data.last_name }} {{ slotProps.data.first_name }} {{ slotProps.data.middle_name }}
              </div>
            </RouterLink>
          </template>
        </Column>
        <Column header="МО">
          <template #body="slotProps">
            {{ slotProps.data.municipal.name }}
          </template>
        </Column>
        <Column header="Дата рождения">
          <template #body="slotProps">
            {{ slotProps.data.birth_date ? useFormatDate(slotProps.data.birth_date) : '' }}
          </template>
        </Column>
        <Column header="Дата гибели(смерти)">
          <template #body="slotProps">
            {{ slotProps.data.date_of_death ? useFormatDate(slotProps.data.date_of_death) : '' }}
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
              :to="`peoples/update/${slotProps.data.id}`"
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
