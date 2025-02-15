<script setup lang="ts">
import {
  CategoriesQueryVariables,
  Category, CategoryCloneMutation,
  CategoryColumns,
  CategoryFilter,
  QueryCategoriesOrderByOrderByClause,
  SortOrder,
  useCategoriesQuery,
  useCategoryCloneMutation,
  useCategoryDeleteMutation,
} from '@/generated/graphqlOperations.js'
import { reactive, ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { useTitle } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { DataTablePageEvent, DataTableSortEvent } from 'primevue/datatable'
import { useRouter } from 'vue-router'
import { FetchResult } from '@apollo/client'

const router = useRouter()
const { t } = useI18n()

useTitle(t('categories.name'))
const confirm = useConfirm()
const toast = useToast()

const paginator = ref({
  currentPage: 1,
  total: 0,
  perPage: 10,
})

const filter = ref<CategoryFilter>()
const orderBy = ref<QueryCategoriesOrderByOrderByClause>({
  column: CategoryColumns.Name,
  order: SortOrder.Asc,
})
const variables = reactive<CategoriesQueryVariables>({
  first: paginator.value.perPage,
  page: 1,
  filter: filter.value,
  orderBy: [orderBy.value],
})

const models = ref()
const { onResult, loading, refetch } = useCategoriesQuery(variables, { fetchPolicy: 'no-cache' })
onResult((queryResult) => {
  if (queryResult.data) {
    models.value = queryResult.data?.categories?.data
    paginator.value = { ...queryResult.data.categories.paginatorInfo }
    variables.page = paginator.value.currentPage
  }
})

const { mutate: mutateDelete, onDone: onDoneDelete } = useCategoryDeleteMutation()
onDoneDelete(() => {
  refetch()
  toast.add({
    severity: 'success',
    summary: t('common.success'),
    detail: t('categories.deleteSuccess'),
    life: 3000,
  })
})
const handleConfirmDelete = (data: Category) => {
  confirm.require({
    message: t('categories.confirmDeleteMessage'),
    header: t('common.confirmDelete'),
    icon: 'pi pi-info-circle',
    rejectClass: 'p-button-text p-button-text',
    acceptClass: 'p-button-danger p-button-text',
    acceptLabel: t('common.yes'),
    rejectLabel: t('common.no'),
    accept: () => {
      mutateDelete({ id: data.id })
    },
  })
}
const handlePageChange = (event: DataTablePageEvent) => {
  variables.page = event.page + 1
}
const onHandleSort = (event: DataTableSortEvent) => {
  console.log(event)
  orderBy.value = {
    column: event.sortField as CategoryColumns,
    order: event.sortOrder == 1 ? SortOrder.Asc : SortOrder.Desc,
  }
  variables.orderBy = [orderBy.value]
}

const { mutate: mutateClone, onDone: onDoneClone, onError: onCloneError } = useCategoryCloneMutation()
onDoneClone((result: FetchResult<CategoryCloneMutation>) => {
  router.push({ name: 'categoryUpdate', params: { id: result.data?.categoryClone?.id } })
  toast.add({
    severity: 'success',
    summary: t('common.success'),
    detail: t('categories.cloneSuccess'),
    life: 3000,
  })
})
onCloneError((error) => {
  toast.add({
    severity: 'error',
    summary: t('common.error'),
    detail: error.message,
    life: 3000,
  })
})
const handleConfirmClone = (id: string) => {
  confirm.require({
    message: t('categories.confirmCloneMessage'),
    header: t('categories.confirmClone'),
    icon: 'pi pi-info-circle',
    rejectClass: 'p-button-text p-button-text',
    acceptClass: 'p-button-danger p-button-text',
    acceptLabel: t('common.yes'),
    rejectLabel: t('common.no'),
    accept: () => {
      mutateClone({ id: id })
    },
  })
}
</script>

<template>
  <Card>
    <template #title>
      <div class="flex flex-row justify-between">
        <span>{{ t('categories.name') }}</span>
        <Button
          icon="pi pi-plus"
          :label="t('common.add')"
          size="small"
          as="router-link"
          :to="`categories/create`"
        />
      </div>
    </template>
    <template #content>
      <DataTable
        :value="models"
        ref="dt"
        :loading="loading"
        lazy
        striped-rows
        size="small"
        paginator
        :rows="10"
        :total-records="paginator.total"
        @page="handlePageChange"
        @sort="onHandleSort"
      >
        <Column
          field="name"
          :header="t('common.name')"
        />
        <Column
          field="properties"
          :header="t('common.properties')"
        >
          <template #body="slotProps">
            <Tag
              class="mx-1 mb-1"
              severity="info"
              v-for="categoryProperty in slotProps.data.categoryProperties"
              v-bind:key="categoryProperty.property.id"
              >{{ categoryProperty.property.name }}
            </Tag>
          </template>
        </Column>
        <Column
          :header="t('common.operations')"
          style="width: 10rem"
        >
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              v-tooltip.top="t('categories.update')"
              raised
              rounded
              severity="success"
              as="router-link"
              :to="`categories/update/${slotProps.data.id}`"
            />
            <Button
              class="ml-2"
              icon="pi pi-clone"
              v-tooltip.top="t('categories.clone')"
              raised
              rounded
              severity="info"
              @click="handleConfirmClone(slotProps.data.id)"
            />
            <Button
              class="ml-2"
              icon="pi pi-trash"
              v-tooltip.top="t('categories.delete')"
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
