<script setup lang="ts">
import {
  PropertiesQueryVariables,
  Property,
  PropertyColumns,
  PropertyFilter,
  QueryPropertiesOrderByOrderByClause,
  SortOrder,
  usePropertiesQuery,
  usePropertyDeleteMutation,
} from '@/generated/graphqlOperations.js'
import { computed, onUnmounted, reactive, ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { useErrorsStore } from '@/stores/useErrors.js'
import PropertyFilterPanel from '@/views/dictionaries/properties/partials/PropertyFilterPanel.vue'
import { DataTablePageEvent, DataTableSortEvent } from 'primevue/datatable'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useTitle } from '@vueuse/core'

const router = useRouter()
const route = useRoute()
const { t, locale } = useI18n()
const errStore = useErrorsStore()
errStore.clearStore()
const confirm = useConfirm()
const toast = useToast()

useTitle(t('property.name'))
const orderBy = ref<QueryPropertiesOrderByOrderByClause>({
  column: PropertyColumns.Name,
  order: SortOrder.Asc,
})
const variables = reactive<PropertiesQueryVariables>({
  first: 10,
  page: 1,
  filter: {},
  orderBy: [orderBy.value],
})

const { result: articlesResult, loading, refetch } = usePropertiesQuery(variables, { fetchPolicy: 'no-cache' })
const articles = computed(() => articlesResult.value?.properties.data)
const total = computed(() => articlesResult.value?.properties.paginatorInfo.total)

const { mutate: mutateDelete, onDone: onDoneDelete } = usePropertyDeleteMutation()
onDoneDelete(() => {
  refetch()
  toast.add({
    severity: 'success',
    summary: t('common.success'),
    detail: t('property.deleteSuccess'),
    life: 3000,
  })
})
const handleConfirmDelete = (data: Property) => {
  confirm.require({
    message: t('property.confirmDeleteMessage'),
    header: t('common.confirmDelete'),
    icon: 'pi pi-info-circle',
    rejectClass: 'p-button-text p-button-text',
    acceptClass: 'p-button-danger p-button-text',
    acceptLabel: 'Да',
    rejectLabel: 'Нет',
    accept: () => {
      mutateDelete({ id: data.id })
    },
  })
}
const handlePageChange = (event: DataTablePageEvent) => {
  variables.page = event.page + 1
  router.push({ query: { page: variables.page } })
}
const onHandleSort = (event: DataTableSortEvent) => {
  console.log(event)
  orderBy.value = {
    column: event.sortField as PropertyColumns,
    order: event.sortOrder == 1 ? SortOrder.Asc : SortOrder.Desc,
  }
  variables.orderBy = [orderBy.value]
  router.push({ query: { sort: orderBy.value.column, order: orderBy.value.order } })
}

const handleApplyFilter = (filter: PropertyFilter) => {
  variables.filter = filter
  router.push({ query: variables })
}
onUnmounted(() => {
  errStore.clearStore()
})
</script>

<template>
  <Card>
    <template #title>
      <div class="flex flex-row justify-between">
        <span>{{ t('property.name') }}</span>
        <Button
          icon="pi pi-plus"
          :label="t('common.add')"
          size="small"
          as="router-link"
          :to="`properties/create`"
        />
      </div>
    </template>
    <template #content>
      <PropertyFilterPanel @apply-filter="handleApplyFilter" />
      <DataTable
        :value="articles"
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
          field="name"
          :header="t('common.name')"
          sort-field="NAME"
          sortable
        />
        <Column
          field="type"
          :header="t('property.type')"
          sort-field="TYPE"
          sortable
        >
          <template #body="slotProps">
            {{ t('property.types.' + slotProps.data.type.toLowerCase()) }}
          </template>
        </Column>
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
              :to="`properties/update/${slotProps.data.id}`"
            />
            <Button
              class="ml-2"
              icon="pi pi-trash"
              raised
              rounded
              severity="warn"
              @click="handleConfirmDelete(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>

<style scoped></style>
