<script setup lang="ts">
import {
  Country,
  CountryInput,
  useCountriesQuery,
  useCountryCreateMutation,
  useCountryDeleteMutation,
  useCountryUpdateMutation,
} from '@/generated/graphqlOperations.js'
import { computed, ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import FieldError from '@/components/errors/FieldError.vue'
import { useErrorsStore } from '@/stores/useErrors.js'
import { useTitle } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
useTitle(t('sideMenu.countries'))
const errStore = useErrorsStore()
const confirm = useConfirm()
const toast = useToast()
const { result, loading, refetch } = useCountriesQuery()
const models = computed(() => result.value?.countries)
const visibleAddDialog = ref(false)
const mode = ref('update')
const modelId = ref('')
const model = ref<CountryInput>({})

const { mutate: createMutate, onDone: createOnDone } = useCountryCreateMutation()
createOnDone(() => {
  errStore.$reset()
  refetch()
  visibleAddDialog.value = false
  toast.add({
    severity: 'success',
    summary: t('common.success'),
    detail: t('countries.createSuccess'),
    life: 3000,
  })
})

const { mutate: updateMutate, onDone: updateOnDone } = useCountryUpdateMutation()
updateOnDone(() => {
  errStore.$reset()
  refetch()
  visibleAddDialog.value = false
  toast.add({
    severity: 'success',
    summary: t('common.success'),
    detail: t('countries.updateSuccess'),
    life: 3000,
  })
})

const { mutate: mutateDelete, onDone: onDoneDelete } = useCountryDeleteMutation()
onDoneDelete(() => {
  refetch()
  toast.add({
    severity: 'success',
    summary: t('common.success'),
    detail: t('countries.deleteSuccess'),
    life: 3000,
  })
})
const handleConfirmDelete = (data: Country) => {
  confirm.require({
    message: t('countries.confirmDeleteMessage'),
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

const handleShowUpdateDialog = (data: Country) => {
  mode.value = 'update'
  model.value = {
    name: data.name,
  }
  modelId.value = data.id
  visibleAddDialog.value = true
}
const handleShowCreateDialog = () => {
  console.log('create')
  mode.value = 'create'
  model.value = {
    name: '',
  }

  visibleAddDialog.value = true
}
const handleSave = () => {
  if (mode.value === 'create') {
    createMutate({
      input: { ...(model.value as CountryInput) },
    })
  } else {
    updateMutate({
      id: modelId.value,
      input: { ...(model.value as CountryInput) },
    })
  }
}
</script>

<template>
  <Card>
    <template #title>
      <div class="flex flex-row justify-between">
        <span>{{ t('countries.name') }}</span>
        <Button
          icon="pi pi-plus"
          :label="t('common.add')"
          size="small"
          @click="handleShowCreateDialog"
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
      >
        <Column
          field="name"
          :header="t('common.name')"
        />
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
        :style="{ width: '50rem' }"
        :header="mode === 'create' ? t('common.add') : t('common.update')"
        modal
      >
        <Fluid>
          <div class="p-fluid grid formgrid">
            <div class="col-12 field">
              <label for="account-name">{{ t('common.name') }}</label>
              <InputText
                v-model="model.name"
                autofocus
              />
              <FieldError field-name="input.name" />
            </div>
          </div>
        </Fluid>
        <template #footer>
          <Button
            severity="secondary"
            icon="pi pi-time"
            :label="t('common.cancel')"
            @click="visibleAddDialog = false"
          />
          <Button
            icon="pi pi-check"
            :label="t('common.save')"
            @click="handleSave"
          />
        </template>
      </Dialog>
    </template>
  </Card>
</template>

<style scoped></style>
