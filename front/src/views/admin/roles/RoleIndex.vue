<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { computed, reactive, ref } from 'vue'
import { DataTablePageEvent } from 'primevue/datatable'

import {
  Role,
  RoleColumns,
  RoleInput,
  RolesQueryVariables,
  SortOrder,
  useRoleCreateMutation,
  useRoleDeleteMutation,
  useRolesQuery,
} from '@/generated/graphqlOperations.js'
import { useRouter } from 'vue-router'
import { useErrorsStore } from '@/stores/useErrors.js'
import { useToast } from 'primevue/usetoast'
import FieldError from '@/components/errors/FieldError.vue'
import { useConfirm } from 'primevue/useconfirm'
import { useHasPermission } from '@/composables/useHasPermission.js'

useTitle('Роли')
const errStore = useErrorsStore()
const toast = useToast()
const router = useRouter()
const confirm = useConfirm()
const dt = ref()

const variables = reactive<RolesQueryVariables>({
  orderBy: [
    {
      column: RoleColumns.Name,
      order: SortOrder.Asc,
    },
  ],
})

const onHandleSort = (event: DataTablePageEvent) => {
  variables.orderBy = [
    {
      column: event.sortField as RoleColumns,
      order: event.sortOrder == 1 ? SortOrder.Asc : SortOrder.Desc,
    },
  ]
}

const { result, loading, refetch } = useRolesQuery(variables, {
  fetchPolicy: 'no-cache',
})

const model = ref<RoleInput>({
  name: undefined,
  guard_name: 'api',
  permissions: undefined,
})
const roles = computed(() => result.value?.roles)
useTitle('Роли')

const { mutate: createMutation, onDone: onDoneCreate } = useRoleCreateMutation()

onDoneCreate((result) => {
  if (result.data) {
    errStore.$reset()
    toast.add({
      severity: 'success',
      summary: 'Успех',
      detail: 'Роль успешно изменена',
      life: 3000,
    })
    router.push({
      name: 'adminRoleUpdate',
      params: { id: result.data?.roleCreate.id },
    })
  }
})

const visibleAddDialog = ref(false)
const handleShowCreateDialog = () => {
  model.value.name = ''
  model.value.guard_name = 'api'

  visibleAddDialog.value = true
}
const handleSave = () => {
  createMutation({
    input: { ...model.value },
  })
}
const { mutate: mutateDelete, onDone: onDoneDelete } = useRoleDeleteMutation()
onDoneDelete(() => {
  refetch()
  toast.add({
    severity: 'success',
    summary: 'Успех',
    detail: 'Роль успешно удалена',
    life: 3000,
  })
})
const handleConfirmDelete = (data: Role) => {
  confirm.require({
    message: 'Вы действительно хотите удалить эту роль?',
    header: 'Подтверждение удаления',
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
</script>

<template>
  <Card>
    <template #title>
      <div class="flex flex-row justify-between">
        <div class="flex">Роли</div>
        <Button
          v-if="useHasPermission('roleCreate')"
          icon="pi pi-plus"
          label="Добавить"
          size="small"
          severity="info"
          @click="handleShowCreateDialog"
        />
      </div>
    </template>
    <template #content>
      <DataTable
        ref="dt"
        :loading="loading"
        :value="roles"
        dataKey="id"
        lazy
        @sort="onHandleSort"
        stripedRows
      >
        <Column
          field="name"
          header="Slug"
          sort-field="NAME"
          sortable
        >
          <template #body="slotProps">
            <RouterLink :to="`/admin/roles/update/${slotProps.data.id}`">{{ slotProps.data.name }} </RouterLink>
          </template>
        </Column>
        <Column
          field="title"
          header="Название"
          sort-field="TITLE"
          sortable
        />
        <Column
          header="Оп."
          style="width: 10rem"
        >
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              raised
              rounded
              severity="success"
              @click="router.push(`/admin/roles/update/${slotProps.data.id}`)"
            />
            <Button
              v-if="useHasPermission('roleDelete')"
              class="ml-2"
              icon="pi pi-trash"
              raised
              rounded
              severity="danger"
              @click="handleConfirmDelete(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
      <Dialog
        v-model:visible="visibleAddDialog"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        :style="{ width: '30rem' }"
        header="Добавить роль"
        modal
      >
        <form @submit.prevent="handleSave">
          <div class="p-fluid grid formgrid">
            <div class="flex flex-wrap gap-2 w-full">
              <label for="phone">Slug</label>
              <InputText
                v-model="model.name"
                fluid
              />
              <FieldError field-name="input.name" />
            </div>
            <div class="flex flex-wrap gap-2 w-full">
              <label for="phone">Название роли</label>
              <InputText
                v-model="model.title"
                fluid
              />
              <FieldError field-name="input.title" />
            </div>
          </div>
        </form>
        <template #footer>
          <Button
            icon="pi pi-time"
            label="Отменить"
            severity="secondary"
            @click="visibleAddDialog = false"
          />
          <Button
            icon="pi pi-check"
            label="Сохранить"
            @click="handleSave"
          />
        </template>
      </Dialog>
    </template>
  </Card>
</template>

<style scoped></style>
