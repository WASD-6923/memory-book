<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { onUnmounted, reactive, ref } from 'vue'
import { DataTablePageEvent, DataTableSortEvent } from 'primevue/datatable'
import {
  AuditColumns,
  AuditsQueryVariables,
  SortOrder,
  useAuditsQuery,
  UserFilter,
} from '@/generated/graphqlOperations.js'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useErrorsStore } from '@/stores/useErrors.ts'
import { useFormatDate } from '@/composables/useFormatDate.js'
import dayjs from "dayjs";

const errStore = useErrorsStore()
errStore.clearStore()
const route = useRoute()
const { t } = useI18n()
useTitle('Логирование действий пользователей')
const dt = ref()
const profiles = ref()
const paginator = ref({
  currentPage: 1,
  total: 0,
  perPage: 10,
})

const variables = reactive<AuditsQueryVariables>({
  first: paginator.value.perPage,
  page: 1,
  orderBy: [
    {
      column: AuditColumns.Id,
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
      column: event.sortField as AuditColumns,
      order: event.sortOrder == 1 ? SortOrder.Asc : SortOrder.Desc,
    },
  ]
}

const { onResult, loading, refetch } = useAuditsQuery(variables, {
  fetchPolicy: 'no-cache',
})

onResult((queryResult) => {
  if (queryResult.data) {
    profiles.value = queryResult.data?.audits.data
    paginator.value = { ...queryResult.data.audits.paginatorInfo }
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
        <div>Логирование действий пользователей</div>
      </div>
    </template>
    <template #content>
      <!--      <PeopleFilterPanel @apply-filter="handleApplyFilter" />-->
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
        <Column header="Воин">
          <template #body="slotProps">
            <RouterLink :to="`/admin/audits/view/${slotProps.data.id}`">
              <div class="text-primary">
                {{ slotProps.data.auditable.last_name }} {{ slotProps.data.auditable.first_name }}
                {{ slotProps.data.auditable.middle_name }}
              </div>
            </RouterLink>
          </template>
        </Column>
        <Column header="Дата">
          <template #body="slotProps">
            {{ dayjs(slotProps.data.created_at).format('DD.MM.YYYY HH:mm') }}
          </template>
        </Column>
        <Column header="Модератор">
          <template #body="slotProps">
            {{ slotProps.data.user.fullName }}
          </template>
        </Column>
        <Column
          :header="t('common.operations')"
          style="width: 4rem"
        >
          <template #body="slotProps">
            <Button
              icon="pi pi-eye"
              raised
              rounded
              severity="info"
              as="router-link"
              :to="`audits/view/${slotProps.data.id}`"
            />
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>

<style scoped></style>
