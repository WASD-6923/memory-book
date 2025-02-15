<script setup lang="ts">
import { onMounted, PropType, ref } from 'vue'
import {
  ApplicationSample,
  ApplicationSampleDocument,
  ApplicationSampleDocumentInput,
  Document,
  Property,
  RealtyProperty,
  useApplicationSampleDocumentCreateMutation,
  useApplicationSampleDocumentDeleteMutation,
  useApplicationSampleDocumentLazyQuery,
  useApplicationSampleDocumentsLazyQuery,
  useApplicationSampleDocumentUpdateMutation,
  useModelRepositionMutation,
} from '@/generated/graphqlOperations.ts'
import DocumentsTable from '@/components/document/DocumentsTable.vue'
import { useI18n } from 'vue-i18n'
import { DataTableRowReorderEvent } from 'primevue/datatable'
import FieldError from '@/components/errors/FieldError.vue'
import { useErrorsStore } from '@/stores/useErrors.ts'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

const confirm = useConfirm()
const errStore = useErrorsStore()
errStore.clearStore()
const toast = useToast()
const { t } = useI18n()
const props = defineProps({
  id: {
    type: String,
    required: false,
    default: '',
  },
  mode: {
    type: String,
    required: false,
    default: 'update',
  },
})

const models = ref<ApplicationSampleDocument[]>()
const {
  onResult: onDocumentsResult,
  onError: onDocumentsError,
  load: loadSampleDocuments,
  refetch: refetchSampleDocuments,
} = useApplicationSampleDocumentsLazyQuery({ filter: { applicationSampleId: props.id } }, { fetchPolicy: 'no-cache' })

const loadOrRefetch = () => {
  console.log('loadOrRefetch')
  loadSampleDocuments(null, { filter: { applicationSampleId: props.id } }) ||
    refetchSampleDocuments({ filter: { applicationSampleId: props.id } })
}
onMounted(() => {
  loadOrRefetch()
})
onDocumentsResult((result) => {
  console.log(result)
  if (result.data) {
    console.log(result.data)
    models.value = result.data.applicationSampleDocuments as ApplicationSampleDocument[]
  }
})
onDocumentsError((result) => {
  console.log(result)
})

const { mutate: repositionMutation } = useModelRepositionMutation()
const handleRowReorder = (event: DataTableRowReorderEvent) => {
  console.log(event.value)
  const modelPositions = event.value.map((rp: RealtyProperty) => ({ id: rp.id, position: rp.position }))
  repositionMutation({
    input: {
      model: 'App\\Models\\Application\\ApplicationSampleDocument',
      positions: modelPositions,
    },
  })
  loadOrRefetch()
  //localModelValue.value.applicationSampleDocuments = event.value
}

const { mutate: createMutation, onDone: onDoneCreate } = useApplicationSampleDocumentCreateMutation()

onDoneCreate((result) => {
  if (result.data) {
    errStore.$reset()
    toast.add({
      severity: 'success',
      summary: t('common.success'),
      detail: t('applicationSampleDocument.createSuccess'),
      life: 3000,
    })
    models.value?.push({
      ...(result.data.applicationSampleDocumentCreate as ApplicationSampleDocument),
      documents: [],
    })
    dialogModelId.value = result.data.applicationSampleDocumentCreate?.id as string
    dialogMode.value = 'update'
  }
})

const { mutate: updateMutation, onDone: onDoneUpdate } = useApplicationSampleDocumentUpdateMutation()
onDoneUpdate(() => {
  loadOrRefetch()
})

const showDialog = ref(false)
const dialogMode = ref('create')
const dialogModelId = ref('')

interface IDialogData {
  name?: string
  description?: string
  documents?: Document[]
}

const dialogData = ref<IDialogData>({
  description: undefined,
  name: undefined,
  documents: undefined,
})
const handleAddDialog = () => {
  dialogData.value = {
    description: undefined,
    name: undefined,
    documents: [],
  }
  dialogMode.value = 'create'
  showDialog.value = true
}

const {
  onResult: onAppSampleDocResult,
  load: appSampleDocLoad,
  refetch: appSampleDocRefetch,
} = useApplicationSampleDocumentLazyQuery()

onAppSampleDocResult((result) => {
  if (result.data) {
    dialogData.value = {
      name: result.data.applicationSampleDocument.name as string,
      description: result.data.applicationSampleDocument.description as string,
      documents: [...(result.data.applicationSampleDocument.documents as [])],
    }
    dialogModelId.value = result.data.applicationSampleDocument.id
  }
})
const handleUpdateDialog = (data: ApplicationSampleDocument) => {
  appSampleDocLoad(null, { id: data.id }) || appSampleDocRefetch({ id: data.id })
  dialogMode.value = 'update'
  showDialog.value = true
  dialogModelId.value = data.id
}

const handleSave = () => {
  const input: ApplicationSampleDocumentInput = {
    name: dialogData.value.name,
    description: dialogData.value.description,
    application_sample_id: props.id,
  }
  if (dialogMode.value === 'update') {
    updateMutation({
      id: dialogModelId.value,
      input: input,
    })
    showDialog.value = false
  } else {
    createMutation({
      input: input,
    })
  }
}

const { mutate: deleteMutation, onDone: onDoneDelete } = useApplicationSampleDocumentDeleteMutation()
onDoneDelete(() => {
  toast.add({
    severity: 'success',
    summary: t('common.success'),
    detail: t('applicationSampleDocument.deleteSuccess'),
    life: 3000,
  })
})
const handleConfirmDelete = (data: Property, index: number) => {
  confirm.require({
    message: t('applicationSampleDocument.confirmDeleteMessage'),
    header: t('common.confirmDelete'),
    icon: 'pi pi-info-circle',
    rejectClass: 'p-button-text p-button-text',
    acceptClass: 'p-button-danger p-button-text',
    acceptLabel: t('common.yes'),
    rejectLabel: t('common.no'),
    accept: () => {
      console.log(index)
      deleteMutation({ id: data.id })
      models.value?.splice(index, 1)
    },
  })
}
</script>

<template>
  <div class="flex flex-row-reverse">
    <Button
      icon="pi pi-plus"
      :label="t('common.add')"
      size="small"
      @click="handleAddDialog"
    />
  </div>
  <DataTable
    :value="models"
    tableStyle="min-width: 50rem"
    @rowReorder="handleRowReorder"
    dataKey="id"
  >
    <Column
      rowReorder
      headerStyle="width: 3rem"
    />
    <Column
      field="name"
      :header="t('common.name')"
    >
    </Column>
    <Column
      field="description"
      :header="t('common.description')"
    >
    </Column>
    <Column
      field="property.value"
      :header="t('property.value')"
    >
      <template #body="slotProps">
        <div
          class="text-primary border-b mb-2"
          v-for="doc in slotProps.data.documents"
          :key="doc.id"
        >
          <a
            :href="doc.url"
            target="_blank"
            class="max-w-40 text-ellipsis"
          >{{ doc.name }} <i class="pi pi-external-link"></i>
          </a>
        </div>
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
          @click="handleUpdateDialog(slotProps.data)"
        />
        <Button
          class="ml-2"
          icon="pi pi-trash"
          raised
          rounded
          severity="warn"
          @click="handleConfirmDelete(slotProps.data, slotProps.index)"
        />
      </template>
    </Column>
  </DataTable>
  <Dialog
    v-model:visible="showDialog"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    :style="{ width: '50rem' }"
    :header="dialogMode === 'create' ? t('applicationSampleDocument.add') : t('applicationSampleDocument.update')"
    modal
  >
    <Fluid>
      <div class="p-fluid grid formgrid">
        <div class="col-12 field mb-4">
          <label for="name">{{ t('common.name') }}</label>
          <InputText
            id="name"
            v-model="dialogData.name"
          />
          <FieldError field-name="input.name" />
        </div>
        <div class="col-12 field mb-4">
          <label for="description">{{ t('common.description') }}</label>
          <Textarea
            id="name"
            v-model="dialogData.description"
            rows="5"
          />
          <FieldError field-name="input.name" />
        </div>
        <div
          class="col-12 field mb-4"
          v-if="dialogMode === 'update'"
        >
          <DocumentsTable
            :document-type="0"
            documentable-type="applicationSampleDocument"
            :documentable-id="dialogModelId"
            v-model="dialogData.documents"
            multiple
          />
        </div>
      </div>
    </Fluid>
    <template #footer>
      <Button
        severity="secondary"
        icon="pi pi-time"
        :label="t('common.cancel')"
        @click="showDialog = false"
      />
      <Button
        icon="pi pi-check"
        :label="t('common.save')"
        @click="handleSave"
      />
    </template>
  </Dialog>
</template>

<style scoped></style>
