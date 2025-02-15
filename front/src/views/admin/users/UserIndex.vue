<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { onUnmounted, reactive, ref } from 'vue'
import { DataTablePageEvent, DataTableSortEvent } from 'primevue/datatable'
import {
  SortOrder,
  UserColumns,
  UserFilter,
  UsersQueryVariables,
  useUsersQuery,
} from '@/generated/graphqlOperations.js'
import { useI18n } from 'vue-i18n'
import UserFilterPanel from '@/views/admin/users/partials/UserFilterPanel.vue'
import { useRoute } from 'vue-router'
import { useErrorsStore } from '@/stores/useErrors.ts'

const errStore = useErrorsStore()
errStore.clearStore()
const route = useRoute()
const { t } = useI18n()
useTitle(t('user.users'))
const dt = ref()
const users = ref()
const paginator = ref({
  currentPage: 1,
  total: 0,
  perPage: 10,
})

const variables = reactive<UsersQueryVariables>({
  first: paginator.value.perPage,
  page: 1,
  orderBy: [
    {
      column: UserColumns.CreatedAt,
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
      column: event.sortField as UserColumns,
      order: event.sortOrder == 1 ? SortOrder.Asc : SortOrder.Desc,
    },
  ]
}

const { onResult, loading } = useUsersQuery(variables, {
  fetchPolicy: 'no-cache',
})

onResult((queryResult) => {
  if (queryResult.data) {
    users.value = queryResult.data?.users.data
    paginator.value = { ...queryResult.data.users.paginatorInfo }
    variables.page = paginator.value.currentPage
  }
})

useTitle(t('user.users'))
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
        <div>{{ t('user.users') }}</div>
        <Button
          icon="pi pi-user-plus"
          :label="t('common.add')"
          size="small"
          as="router-link"
          to="/admin/users/create"
          severity="info"
        />
      </div>
    </template>
    <template #content>
      <UserFilterPanel @apply-filter="handleApplyFilter" />
      <DataTable
        ref="dt"
        :loading="loading"
        :rows="paginator.perPage"
        :totalRecords="paginator.total"
        :value="users"
        dataKey="id"
        lazy
        paginator
        @page="onPage($event)"
        @sort="onHandleSort"
        :rowsPerPageOptions="[10, 20, 50, 100]"
        stripedRows
      >
        <Column header="Имя">
          <template #body="slotProps">
            {{ slotProps.data.first_name }} {{ slotProps.data.last_name?.charAt(0) }}.
          </template>
        </Column>
        <Column
          field="email"
          :header="t('user.email')"
          sort-field="EMAIL"
          sortable
        >
          <template #body="slotProps">
            <a
              class="text-primary"
              :href="`mailto: ${slotProps.data.email}`"
              >{{ slotProps.data.email }}
            </a>
          </template>
        </Column>
        <Column
          field="phone"
          :header="t('user.phone')"
          sort-field="PHONE"
          sortable
        >
          <template #body="slotProps">
            <a
              class="text-primary"
              :href="`tel: ${slotProps.data.phone}`"
              >{{ slotProps.data.phone }}
            </a>
          </template>
        </Column>
        <Column header="Роли">
          <template #body="slotProps">
            <Badge
              severity="secondary"
              v-for="role in slotProps.data.roles"
              :key="role.id"
              >{{ role.title }}
            </Badge>
          </template>
        </Column>
        <Column
          field="telegram_id"
          header="Telegram ID"
          sort-field="TELEGRAM_ID"
          sortable
        />
        <Column
          field="status"
          header="Статус"
          sort-field="STATUS"
          sortable
        />
        <Column
          field="created_at"
          header="Дата создания"
          sort-field="CREATED_AT"
          sortable
        />
        <Column
          :header="t('common.operations')"
          style="width: 10rem"
        >
          <template #body="slotProps">
            <!--            <Button
                          icon="pi pi-eye"
                          raised
                          rounded
                          severity="info"
                          as="router-link"
                          :to="`users/view/${slotProps.data.id}`"
                        />-->
            <Button
              class="ml-2"
              icon="pi pi-user-edit"
              raised
              rounded
              severity="success"
              as="router-link"
              :to="`users/update/${slotProps.data.id}`"
            />
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>

<style scoped></style>
