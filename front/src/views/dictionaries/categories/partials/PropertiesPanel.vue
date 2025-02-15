<script setup lang="ts">
import {
  AccessLevel,
  Category,
  CategoryProperty,
  CategoryPropertyWithPropertyCreateInput,
  CategoryPropertyWithPropertyUpdateInput,
  Property,
  PropertyColumns,
  PropertyOption,
  PropertyType,
  SortOrder,
  useCategoryPropertiesLazyQuery,
  useCategoryPropertyCreateMutation,
  useCategoryPropertyDeleteMutation,
  useCategoryPropertyWithPropertyCreateMutation,
  useCategoryPropertyWithPropertyUpdateMutation,
  useModelRepositionMutation,
  usePropertiesLazyQuery,
} from '@/generated/graphqlOperations.ts'
import { useI18n } from 'vue-i18n'
import { useAccessLevelNames } from '@/composables/realities/useAccessLevelNames.ts'
import { computed, onMounted, PropType, ref, watch } from 'vue'
import { IEnumObject } from '@/types/IEnumObject.ts'
import { DataTableRowReorderEvent } from 'primevue/datatable'
import { useConfirm } from 'primevue/useconfirm'
import FieldError from '@/components/errors/FieldError.vue'
import { useErrorsStore } from '@/stores/useErrors.ts'
import { useToast } from 'primevue/usetoast'
import { usePropertyTypeNames } from '@/composables/properties/usePropertyTypeNames.ts'

const toast = useToast()
const errStore = useErrorsStore()
errStore.clearStore()
const confirm = useConfirm()
const { t } = useI18n()
const props = defineProps({
  categoryId: {
    type: String,
    required: false,
    default: '',
  },
  modelValue: {
    type: Object as PropType<Category>,
    required: true,
  },
})

const op = ref()
const emit = defineEmits(['update:modelValue'])
const localModelValue = ref({ ...props.modelValue })
const accessNames = computed(() =>
  useAccessLevelNames.map((item: IEnumObject) => {
    return {
      label: t(item.label),
      value: item.value,
    }
  }),
)
watch(
  () => props.modelValue,
  (newValue) => {
    localModelValue.value = { ...newValue }
  },
)

watch(localModelValue, (newValue) => {
  emit('update:modelValue', newValue)
})

const categoryProperties = ref<CategoryProperty[]>()
const {
  onResult: categoryPropertiesOnResult,
  load: loadCategoryProperties,
  refetch: refetchCategoryProperties,
} = useCategoryPropertiesLazyQuery({
  filter: { categoryId: props.categoryId },
})

categoryPropertiesOnResult((result) => {
  if (result.data) {
    categoryProperties.value = [...(result.data.categoryProperties as CategoryProperty[])]
  }
})
const loadOrRefetch = () => {
  loadCategoryProperties() || refetchCategoryProperties()
}

const {
  result: propertiesResult,
  load: loadProperties,
  refetch: refetchProperties,
} = usePropertiesLazyQuery(
  { first: 999, page: 1, orderBy: [{ column: PropertyColumns.Name, order: SortOrder.Asc }] },
  { fetchPolicy: 'no-cache' },
)

onMounted(() => {
  loadOrRefetch()
  loadProperties()
})
const availableProperties = computed(() => {
  const existsProperties = categoryProperties.value?.map((prop: CategoryProperty) => prop.property?.id) ?? []

  return (
    propertiesResult.value?.properties?.data?.filter(
      (prop: Partial<Property>) => !existsProperties.includes(prop.id as string),
    ) ?? []
  )
})

const { mutate: repositionMutation } = useModelRepositionMutation()
const handleRowReorder = (event: DataTableRowReorderEvent) => {
  const modelPositions = event.value.map((cp: CategoryProperty) => ({ id: cp.id, position: cp.position }))
  repositionMutation({
    input: {
      model: 'App\\Models\\Realty\\CategoryProperty',
      positions: modelPositions,
    },
  })
  categoryProperties.value = event.value
}

const { mutate: createMutation, onDone: onDoneCreate } = useCategoryPropertyCreateMutation()
const handleCreateCategoryProperty = (id: string) => {
  createMutation({
    input: {
      category_id: props.categoryId,
      property_id: id,
      access_level: AccessLevel.Public,
    },
  })
  op.value.hide()
}

onDoneCreate(() => {
  loadOrRefetch()
})

const { mutate: updateCategoryPropertyMutation, onDone: onDoneUpdate } = useCategoryPropertyWithPropertyUpdateMutation()
onDoneUpdate((result) => {
  if (result.data?.categoryPropertyWithPropertyUpdate) {
    errStore.$reset()
    toast.add({
      severity: 'success',
      summary: t('common.success'),
      detail: t('property.updateSuccess'),
      life: 3000,
    })
    showPropertyDialog.value = false
    refetchProperties()
    loadOrRefetch()
  }
})

const { mutate: mutateDelete } = useCategoryPropertyDeleteMutation()
const handleConfirmDelete = (id: string, index: number) => {
  confirm.require({
    message: t('property.confirmDeleteMessage'),
    header: t('common.confirmDelete'),
    icon: 'pi pi-info-circle',
    rejectClass: 'p-button-text p-button-text',
    acceptClass: 'p-button-danger p-button-text',
    acceptLabel: t('common.yes'),
    rejectLabel: t('common.no'),
    accept: () => {
      mutateDelete({ id: id })
      categoryProperties.value?.splice(index, 1)
    },
  })
}
const handleTogglePopover = (event: MouseEvent) => {
  op.value.toggle(event)
}

const propertyTypeNames = computed(() =>
  usePropertyTypeNames.map((item: IEnumObject) => {
    return {
      label: t(item.label),
      value: item.value,
    }
  }),
)

const { mutate: createPropertyMutation, onDone: onDoneStoreProperty } = useCategoryPropertyWithPropertyCreateMutation()

onDoneStoreProperty((result) => {
  if (result.data?.categoryPropertyWithPropertyCreate) {
    errStore.$reset()
    toast.add({
      severity: 'success',
      summary: t('common.success'),
      detail: t('property.createSuccess'),
      life: 3000,
    })
    showPropertyDialog.value = false
    refetchProperties()
    loadOrRefetch()
  }
})

const dialogModelId = ref<string>()
const dialogMode = ref<string>('create')
const dialogModel = ref<CategoryPropertyWithPropertyCreateInput | CategoryPropertyWithPropertyUpdateInput>({
  access_level: AccessLevel.Public,
  alias: undefined,
  category_id: props.categoryId,
  property_id: undefined,
  name: undefined,
  type: PropertyType.String,
  options: [],
})
const showPropertyDialog = ref(false)
const handleAddNewProperty = () => {
  dialogModel.value = {
    access_level: AccessLevel.Public,
    alias: undefined,
    category_id: props.categoryId,
    name: undefined,
    type: PropertyType.String,
    options: [],
  }
  dialogMode.value = 'create'
  showPropertyDialog.value = true
}

const handleUpdateProperty = (data: CategoryProperty) => {
  dialogModel.value = {
    access_level: data.access_level,
    alias: data.alias,
    category_id: props.categoryId,
    property_id: data.property_id,
    name: data.property.name,
    type: data.property.type,
    options: data.property.options.map((po: PropertyOption) => ({ label: po.label, value: po.value })),
  }
  dialogModelId.value = data.id
  dialogMode.value = 'update'
  showPropertyDialog.value = true
}

const handleCreateUpdateCategoryPropertyWithProperty = () => {
  if (dialogMode.value === 'create') {
    createPropertyMutation({ input: dialogModel.value as CategoryPropertyWithPropertyCreateInput })
  } else {
    updateCategoryPropertyMutation({
      id: dialogModelId.value as string,
      input: {
        property_id: dialogModel.value.property_id,
        name: dialogModel.value.name,
        alias: dialogModel.value.alias,
        access_level: dialogModel.value.access_level,
        type: dialogModel.value.type,
        options: dialogModel.value.options,
      },
    })
  }
}
const handleAddOption = () => {
  const maxValue = dialogModel.value.options?.length
    ? dialogModel.value.options.reduce(
        (max: number, obj: Partial<PropertyOption>) => (obj.value > max ? obj.value : max),
        dialogModel.value.options[0].value,
      )
    : 0
  dialogModel.value?.options?.push({ value: maxValue + 1, label: '' })
}
const handleDeleteOption = (index: number) => {
  dialogModel.value?.options?.splice(index, 1)
}
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="flex flex-row justify-between">
      <span>{{ t('common.properties') }}</span>
      <div class="flex gap-4">
        <Button
          size="small"
          style="width: 200px"
          @click="handleTogglePopover"
        >
          <i class="pi pi-plus"></i>
          <span>{{ t('categories.addFromExisted') }}</span>
          <Badge
            :value="availableProperties.length"
            severity="secondary"
          ></Badge>
        </Button>
        <Button
          size="small"
          style="width: 200px"
          severity="secondary"
          @click="handleAddNewProperty"
        >
          <i class="pi pi-plus"></i>
          <span>{{ t('categories.add') }}</span>
        </Button>
      </div>
    </div>
    <DataTable
      :value="categoryProperties"
      tableStyle="min-width: 100%"
      @rowReorder="handleRowReorder"
    >
      <Column
        rowReorder
        headerStyle="width: 3rem"
      />
      <Column
        field="property.name"
        :header="t('common.name')"
      ></Column>
      <Column
        field="access_level"
        :header="t('categories.accessLevel')"
      >
        <template #body="slotProps">
          {{ t('realty.accessLevels.' + slotProps.data.access_level.toLowerCase()) }}
        </template>
      </Column>
      <Column
        field="property.type"
        :header="t('property.type')"
      >
        <template #body="slotProps">
          {{ t('property.types.' + slotProps.data.property.type.toLowerCase()) }}
        </template>
      </Column>
      <Column
        field="alias"
        :header="t('property.alias')"
      ></Column>
      <Column
        :header="t('common.operations')"
        headerStyle="width: 8rem"
      >
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            raised
            rounded
            severity="success"
            @click="handleUpdateProperty(slotProps.data)"
          />
          <Button
            class="ml-2"
            icon="pi pi-trash"
            raised
            rounded
            severity="warn"
            @click="handleConfirmDelete(slotProps.data.id, slotProps.index)"
          />
        </template>
      </Column>
    </DataTable>
    <Popover ref="op">
      <div class="flex flex-col gap-4">
        <div>
          <span class="font-medium block mb-2">{{
            availableProperties.length ? t('property.availableProperties') : t('property.notAvailableProperties')
          }}</span>
          <ul class="list-none p-0 m-0 flex flex-col">
            <li
              v-for="property in availableProperties"
              :key="property.id"
              class="px-2 py-3 hover:bg-emphasis cursor-pointer rounded-border"
                @click="handleCreateCategoryProperty(property.id)"
            >
              <div class="flex flex-row justify-between flex-wrap gap-8">
                <div class="flex text-sm text-surface-500 dark:text-surface-400">{{ property.name }}</div>
                <div class="flex text-sm text-surface-500 dark:text-surface-400">{{ property.type }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Popover>
    <Dialog
      v-model:visible="showPropertyDialog"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      :style="{ width: '50rem' }"
      :header="dialogMode === 'create' ? t('property.add') : t('property.update')"
      modal
    >
      <form @submit.prevent="handleCreateUpdateCategoryPropertyWithProperty">
        <div class="flex flex-col gap-4 w-full">
          <div class="flex flex-wrap gap-2 w-full">
            <label for="name">{{ t('common.name') }}<span class="p-invalid">*</span></label>
            <InputText
              v-model="dialogModel.name"
              required="true"
              type="text"
              id="name"
            />
            <FieldError field-name="input.name" />
          </div>
        </div>
        <div class="flex flex-col flex-wrap gap-2 w-full">
          <label for="type">{{ t('categories.accessLevel') }}<span class="p-invalid">*</span></label>
          <Select
            v-model="dialogModel.access_level"
            :options="accessNames"
            option-value="value"
            option-label="label"
          />
          <FieldError field-name="input.access_level" />
        </div>
        <div class="flex flex-col gap-4 w-full">
          <div class="flex flex-wrap gap-2 w-full">
            <label for="alias">{{ t('property.alias') }}<span class="p-invalid">*</span></label>
            <InputText
              v-model="dialogModel.alias"
              required="true"
              type="text"
              id="name"
            />
            <FieldError field-name="input.alias" />
          </div>
        </div>
        <div class="flex flex-col flex-wrap gap-2 w-full">
          <label for="type">{{ t('property.type') }}<span class="p-invalid">*</span></label>
          <Select
            v-model="dialogModel.type"
            :options="propertyTypeNames"
            option-value="value"
            option-label="label"
            @change="dialogModel.options = []"
          />
          <FieldError field-name="input.type" />
        </div>

        <div
          v-if="dialogModel.type == PropertyType.Array"
          class="mt-8"
        >
          <div class="flex flex-row justify-between border-b mb-4">
            <div class="">{{ t('property.options.name') }}<span class="p-invalid">*</span></div>
          </div>
          <div
            class="w-full"
            id="type-options"
          >
            <ul class="list-none">
              <li class="flex flex-row justify-between mb-2">
                <div>{{ t('property.options.value') }}</div>
                <Button
                  icon="pi pi-plus"
                  @click="handleAddOption"
                ></Button>
              </li>
              <li
                class="flex flex-row justify-between gap-4 mb-2"
                v-for="(option, index) in dialogModel.options"
                :key="index"
              >
                <div class="w-full">
                  <InputText
                    v-model="option.label"
                    type="text"
                    fluid
                  />
                  <FieldError :field-name="`input.options.${index}.label`" />
                </div>
                <Button
                  icon="pi pi-minus"
                  severity="warn"
                  @click="handleDeleteOption(index)"
                ></Button>
              </li>
            </ul>
          </div>
        </div>
      </form>
      <template #footer>
        <Button
          icon="pi pi-time"
          label="Отменить"
          severity="secondary"
          @click="showPropertyDialog = false"
        />
        <Button
          icon="pi pi-check"
          label="Сохранить"
          @click="handleCreateUpdateCategoryPropertyWithProperty"
        />
      </template>
    </Dialog>
  </div>
</template>

<style scoped></style>
