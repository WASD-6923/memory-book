<script lang="ts" setup>
import {
  Currency,
  CurrencyInput,
  useCurrenciesQuery,
  useCurrencyCreateMutation,
  useCurrencyDeleteMutation,
  useCurrencyUpdateMutation,
} from '@/generated/graphqlOperations.js'
import { computed, ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import FieldError from '@/components/errors/FieldError.vue'
import { useErrorsStore } from '@/stores/useErrors.js'
import { useTitle } from '@vueuse/core'

useTitle('Валюты')
const errStore = useErrorsStore()
const confirm = useConfirm()
const toast = useToast()
const { result: countriesResult, loading, refetch } = useCurrenciesQuery()
const models = computed(() => countriesResult.value?.currencies)
const visibleAddDialog = ref(false)
const mode = ref('update')
const modelId = ref('')
const model = ref<CurrencyInput>({})

const { mutate: createMutate, onDone: createOnDone } = useCurrencyCreateMutation()
createOnDone(() => {
  errStore.$reset()
  refetch()
  visibleAddDialog.value = false
  toast.add({
    severity: 'success',
    summary: 'Успех',
    detail: 'Тип успешно добавлен',
    life: 3000,
  })
})

const { mutate: updateMutate, onDone: updateOnDone } = useCurrencyUpdateMutation()
updateOnDone(() => {
  errStore.$reset()
  refetch()
  visibleAddDialog.value = false
  toast.add({
    severity: 'success',
    summary: 'Успех',
    detail: 'Тип успешно изменен',
    life: 3000,
  })
})

const { mutate: mutateDelete, onDone: onDoneDelete } = useCurrencyDeleteMutation()
onDoneDelete(() => {
  refetch()
  toast.add({
    severity: 'success',
    summary: 'Успех',
    detail: 'Тип успешно удален',
    life: 3000,
  })
})
const handleConfirmDelete = (data: Currency) => {
  confirm.require({
    message: 'Вы действительно хотите удалить эту валюту',
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

const handleShowUpdateDialog = (data: Currency) => {
  mode.value = 'update'
  model.value = {
    name: data.name,
    okv_code: data.okv_code,
  }
  modelId.value = data.id
  visibleAddDialog.value = true
}
const handleShowCreateDialog = () => {
  console.log('create')
  mode.value = 'create'
  model.value = {
    name: '',
    okv_code: '',
  }

  visibleAddDialog.value = true
}
const handleSave = () => {
  if (mode.value === 'create') {
    createMutate({
      input: { ...(model.value as CurrencyInput) },
    })
  } else {
    updateMutate({
      id: modelId.value,
      input: { ...(model.value as CurrencyInput) },
    })
  }
}
</script>

<template>
  <Card>
    <template #title>
      <div class="flex flex-row justify-between">
        <span>Валюты</span>
        <Button
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
        :value="models"
        lazy
        size="small"
        striped-rows
      >
        <Column
          field="name"
          header="Название"
        />
        <Column
          field="okv_code"
          header="Буквенный код ОКВ"
        />
        <Column
          field="last_value"
          header="Актуальное значение"
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
              @click="handleShowUpdateDialog(slotProps.data)"
            />
            <Button
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
        :header="mode === 'create' ? 'Добавить валюту' : 'Редактирование валюты'"
        :style="{ width: '50rem' }"
        modal
      >
        <Fluid>
          <div class="p-fluid grid formgrid">
            <div class="col-12 field mb-4">
              <label for="account-name">Название валюты</label>
              <InputText
                v-model="model.name"
                autofocus
              />
              <FieldError field-name="input.name" />
            </div>
            <div class="col-12 field">
              <label for="account-name">Буквенный код ОКВ</label>
              <InputText
                v-model="model.okv_code"
                autofocus
              />
              <FieldError field-name="input.okv_code" />
            </div>
          </div>
        </Fluid>
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
