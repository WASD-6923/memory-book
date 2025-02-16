<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { onUnmounted, reactive, ref } from 'vue'
import { DataTablePageEvent, DataTableSortEvent } from 'primevue/datatable'
import {
  ProfileColumns,
  ProfilesQueryVariables,
  SortOrder,
  useProfilesQuery,
  UserFilter,
} from '@/generated/graphqlOperations.js'
import { useI18n } from 'vue-i18n'
import ProfileFilterPanel from '@/views/admin/profiles/partials/ProfileFilterPanel.vue'
import { useRoute } from 'vue-router'
import { useErrorsStore } from '@/stores/useErrors.ts'

const errStore = useErrorsStore()
errStore.clearStore()
const route = useRoute()
const { t } = useI18n()
useTitle('Профили пользователей')
const dt = ref()
const profiles = ref()
const paginator = ref({
  currentPage: 1,
  total: 0,
  perPage: 10,
})

const variables = reactive<ProfilesQueryVariables>({
  first: paginator.value.perPage,
  page: 1,
  orderBy: [
    {
      column: ProfileColumns.CreatedAt,
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
      column: event.sortField as ProfileColumns,
      order: event.sortOrder == 1 ? SortOrder.Asc : SortOrder.Desc,
    },
  ]
}

const { onResult, loading, refetch } = useProfilesQuery(variables, {
  fetchPolicy: 'no-cache',
})

onResult((queryResult) => {
  if (queryResult.data) {
    profiles.value = queryResult.data?.profiles.data
    paginator.value = { ...queryResult.data.profiles.paginatorInfo }
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
    <template #content>
      <ProfileFilterPanel @apply-filter="handleApplyFilter" />
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
          field="user.phone"
          header="Пользователь"
        >
          <template #body="slotProps">
            <RouterLink :to="`/admin/users/view/${slotProps.data.user_id}`">
              <div class="text-primary">
                {{ slotProps.data.user.phone }}
              </div>
            </RouterLink>
          </template>
        </Column>
        <Column header="Имя">
          <template #body="slotProps">
            {{ slotProps.data.user.fullName }}
          </template>
        </Column>
        <Column header="Муниципалитет">
          <template #body="slotProps">
            {{ slotProps.data.municipal?.name }}
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
              :to="`profiles/update/${slotProps.data.id}`"
            />
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>

<style scoped></style>
