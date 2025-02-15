<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useNotificationsStore } from '@/stores/useNotificationsStore.js'
import moment from 'moment'
import { useTitle } from '@vueuse/core'
import {
  Notification,
  NotificationColumns,
  NotificationsQueryVariables,
  SortOrder,
  useNotificationsQuery,
} from '@/generated/graphqlOperations.js'
import { DataTablePageEvent, DataTableSortEvent } from 'primevue/datatable'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
useTitle(t('notification.name'))
const dt = ref()
const paginator = ref({
  currentPage: 1,
  total: 0,
  perPage: 10,
})
const formattedDateTime = (date: string) => {
  return moment(date).format('DD.MM.YYYY HH:mm')
}

const notifyStore = useNotificationsStore()
const notifications = ref<Notification[]>([])

const markAsRead = (id: string) => {
  notifyStore.markAsRead(id)
  notifications.value = notifications.value.map((n) => (n.id === id ? { ...n, read_at: 'yes' } : n))
}
const handleReadAll = () => {
  notifyStore.markAllAsRead()
  notifications.value = notifications.value.map((n) => ({ ...n, read_at: 'yes' }))
}
const variables = reactive<NotificationsQueryVariables>({
  first: paginator.value.perPage,
  page: 1,
  orderBy: [
    {
      column: NotificationColumns.CreatedAt,
      order: SortOrder.Desc,
    },
  ],
})

const onPage = (event: DataTablePageEvent) => {
  variables.page = event.page + 1
  variables.first = event.rows
}
const onHandleSort = (event: DataTableSortEvent) => {
  variables.orderBy = [
    {
      column: event.sortField as NotificationColumns,
      order: event.sortOrder == 1 ? SortOrder.Asc : SortOrder.Desc,
    },
  ]
}

const { onResult, loading } = useNotificationsQuery(variables, {
  fetchPolicy: 'no-cache',
})

onResult((queryResult) => {
  if (queryResult.data) {
    notifications.value = queryResult.data?.notifications.data
    paginator.value = { ...queryResult.data.notifications.paginatorInfo }
    variables.page = paginator.value.currentPage
  }
})
</script>
<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <div class="flex flex-wrap align-items-center justify-between gap-2 mb-2">
          <span class="text-xl text-900 font-bold">{{ t('notification.name') }}</span>
          <Button
            severity="success"
            size="small"
            @click="handleReadAll"
            >{{ t('notification.readAll') }}
          </Button>
        </div>
        <DataTable
          ref="dt"
          :loading="loading"
          :rows="paginator.perPage"
          :totalRecords="paginator.total"
          :value="notifications"
          dataKey="id"
          lazy
          paginator
          @page="onPage($event)"
          @sort="onHandleSort"
          :rowsPerPageOptions="[10, 20, 50, 100]"
        >
          <Column :header="t('notification.message')">
            <template #body="slotProps">
              <span :class="{ 'notify-not-read': slotProps.data.read_at === null }">
                {{ t(slotProps.data.data.message) }}
              </span>
            </template>
          </Column>
          <Column
            :header="t('notification.date')"
            headerStyle="min-width:12rem;"
          >
            <template #body="slotProps">
              {{ formattedDateTime(slotProps.data.created_at) }}
            </template>
          </Column>
          <Column
            :header="t('notification.markAsRead')"
            headerStyle="max-width:2rem;"
          >
            <template #body="slotProps">
              <Button
                :disabled="slotProps.data.read_at !== null"
                class="p-button-rounded p-button-info mr-2"
                icon="pi pi-eye"
                @click="markAsRead(slotProps.data.id)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>
<style scoped>
.notify-not-read {
  font-weight: 700;
}
</style>
