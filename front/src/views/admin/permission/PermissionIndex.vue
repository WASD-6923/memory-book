<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { computed, reactive, ref } from 'vue'
import { DataTablePageEvent } from 'primevue/datatable'

import {
  Permission,
  PermissionColumns,
  PermissionGroup,
  PermissionInput,
  PermissionsQueryVariables,
  SortOrder,
  usePermissionCreateMutation,
  usePermissionDeleteMutation,
  usePermissionsQuery,
  usePermissionUpdateMutation,
} from '@/generated/graphqlOperations.js'
import { useErrorsStore } from '@/stores/useErrors.js'
import { useToast } from 'primevue/usetoast'
import FieldError from '@/components/errors/FieldError.vue'
import { useConfirm } from 'primevue/useconfirm'
import { useHasPermission } from '@/composables/useHasPermission.js'
import { permissionGroupByValue, permissionGroups } from '@/const/permissionGroups.js'

const errStore = useErrorsStore()
const toast = useToast()
const confirm = useConfirm()
const dt = ref()
useTitle('Разрешения')
const variables = reactive<PermissionsQueryVariables>({
  orderBy: [
    {
      column: PermissionColumns.Name,
      order: SortOrder.Asc,
    },
  ],
})

const onHandleSort = (event: DataTablePageEvent) => {
  variables.orderBy = [
    {
      column: event.sortField as PermissionColumns,
      order: event.sortOrder == 1 ? SortOrder.Asc : SortOrder.Desc,
    },
  ]
}

const { result, loading, refetch } = usePermissionsQuery(variables, {
  fetchPolicy: 'no-cache',
})

const model = ref<PermissionInput>({
  name: undefined,
  guard_name: 'api',
  group: PermissionGroup.Admin,
})
const modelId = ref('')
const permissions = computed(() => result.value?.permissions)
useTitle('Разрешения')

const { mutate: createMutation, onDone: onDoneCreate } = usePermissionCreateMutation()

onDoneCreate((result) => {
  if (result.data) {
    errStore.$reset()
    toast.add({
      severity: 'success',
      summary: 'Успех',
      detail: 'Разрешение успешно изменена',
      life: 3000,
    })
    visibleAddDialog.value = false
    refetch()
  }
})

const { mutate: updateMutation, onDone: onDoneUpdate } = usePermissionUpdateMutation()
onDoneUpdate((result) => {
  if (result.data) {
    errStore.$reset()
    toast.add({
      severity: 'success',
      summary: 'Успех',
      detail: 'Разрешение успешно изменена',
      life: 3000,
    })
    visibleAddDialog.value = false
    refetch()
  }
})

const visibleAddDialog = ref(false)
const mode = ref('update')
const handleShowCreateDialog = () => {
  mode.value = 'create'
  model.value.name = ''
  model.value.guard_name = 'api'

  visibleAddDialog.value = true
}

const handleShowUpdateDialog = (data: Permission) => {
  mode.value = 'update'
  model.value.name = data.name
  modelId.value = data.id
  visibleAddDialog.value = true
}
const handleSave = () => {
  if (mode.value === 'create') {
    createMutation({
      input: { ...model.value },
    })
  } else {
    updateMutation({
      id: modelId.value,
      input: { ...model.value },
    })
  }
}

const { mutate: deleteMutation, onDone: onDoneDelete } = usePermissionDeleteMutation()
onDoneDelete(() => {
  refetch()
  toast.add({
    severity: 'success',
    summary: 'Успех',
    detail: 'Разрешение успешно удалено',
    life: 3000,
  })
})
const handleConfirmDelete = (data: Permission) => {
  confirm.require({
    message: 'Вы действительно хотите удалить это разрешение?',
    header: 'Подтверждение удаления',
    icon: 'pi pi-info-circle',
    rejectClass: 'p-button-text p-button-text',
    acceptClass: 'p-button-danger p-button-text',
    acceptLabel: 'Да',
    rejectLabel: 'Нет',
    accept: () => {
      deleteMutation({ id: data.id })
    },
  })
}
</script>

<template>
  <Card>
    <template #title>
      <div class="flex flex-row justify-content-between">
        <span>Разрешения</span>
        <Button
          v-if="useHasPermission('permissionCreate')"
          icon="pi pi-plus"
          label="Добавить"
          size="small"
          @click="handleShowCreateDialog"
        />
      </div>
    </template>
    <template #content>
      <DataTable
        ref="dt"
        :loading="loading"
        :value="permissions"
        dataKey="id"
        lazy
        @sort="onHandleSort"
        stripedRows
      >
        <Column
          field="name"
          header="Название"
          sort-field="Name"
          sortable
        >
          <template #body="slotProps">
            {{ slotProps.data.name }}
          </template>
        </Column>
        <Column
          field="group"
          header="Группа"
          sort-field="Group"
          sortable
        >
          <template #body="slotProps">
            {{ permissionGroupByValue(slotProps.data.group) }}
          </template>
        </Column>
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
              @click="handleShowUpdateDialog(slotProps.data)"
            />
            <Button
              v-if="useHasPermission('permissionDelete')"
              class="ml-2"
              icon="pi pi-trash"
              raised
              rounded
              severity="warning"
              @click="handleConfirmDelete(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
      <Dialog
        v-model:visible="visibleAddDialog"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        :header="mode === 'create' ? 'Добавить разрешение' : 'Редактировать разрешение'"
        :style="{ width: '40rem' }"
        modal
      >
        <div class="p-fluid grid formgrid">
          <div class="col-12 field">
            <label for="account-name">Название разрешения</label>
            <InputText
              v-model.trim="model.name"
              autofocus
            />
            <FieldError field-name="input.name" />
          </div>
          <div class="col-12 field">
            <label for="account-name">Группа</label>
            <Dropdown
              v-model.trim="model.group"
              :options="permissionGroups"
              autofocus
              option-label="label"
              option-value="value"
            />
            <FieldError field-name="input.group" />
          </div>
        </div>
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
