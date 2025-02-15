<script setup lang="ts">
import FieldError from '@/components/errors/FieldError.vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import {
  Property,
  PropertyOption,
  PropertyType,
  usePropertyCreateMutation,
  usePropertyUpdateMutation,
} from '@/generated/graphqlOperations.ts'
import { useRouter } from 'vue-router'
import { useErrorsStore } from '@/stores/useErrors.ts'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { usePropertyTypeNames } from '@/composables/properties/usePropertyTypeNames.ts'
import { IEnumObject } from '@/types/IEnumObject.ts'

const { t } = useI18n()
const router = useRouter()
const errStore = useErrorsStore()
errStore.clearStore()
const toast = useToast()
const emit = defineEmits(['update', 'cancel'])

const modelValue = defineModel<Partial<Property>>()

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

const propertyTypeNames = computed(() =>
  usePropertyTypeNames.map((item: IEnumObject) => {
    return {
      label: t(item.label),
      value: item.value,
    }
  }),
)

const localModel = ref<Partial<Property>>()

onMounted(() => {
  if (props.mode === 'update') {
    localModel.value = {
      name: modelValue.value?.name,
      type: modelValue.value?.type,
      options: modelValue.value?.options,
    }
  } else {
    localModel.value = {
      name: undefined,
      type: PropertyType.String,
      options: [],
    }
  }
})
onUnmounted(() => {
  errStore.clearStore()
})
const { mutate: createMutation, onDone: onDoneStore } = usePropertyCreateMutation()

onDoneStore((result) => {
  if (result.data) {
    errStore.$reset()
    toast.add({
      severity: 'success',
      summary: t('common.success'),
      detail: t('property.createSuccess'),
      life: 3000,
    })
    router.push({
      name: 'propertyIndex',
    })
  }
})

const { mutate: updateMutation, onDone: onDoneUpdate } = usePropertyUpdateMutation()
onDoneUpdate((result) => {
  if (result.data) {
    errStore.$reset()
    toast.add({
      severity: 'success',
      summary: t('common.success'),
      detail: t('property.updateSuccess'),
      life: 3000,
    })
    router.push({
      name: 'propertyIndex',
    })
  }
})

const handleSave = () => {
  const input = {
    name: localModel.value?.name,
    type: localModel.value?.type,
    options:
      localModel.value?.type === PropertyType.Array
        ? localModel.value?.options?.map((option: PropertyOption) => ({
            value: option.value,
            label: option.label,
          }))
        : [],
  }
  if (props.mode === 'create') {
    createMutation({
      input: input,
    })
  } else {
    updateMutation({
      id: props.id,
      input: input,
    })
  }
  console.log('save')
}
const handleCancel = () => {
  emit('cancel')
  router.push({
    name: 'propertyIndex',
  })
}

const handleAddOption = () => {
  const maxValue = localModel.value?.options?.length
    ? localModel.value?.options.reduce(
        (max: number, obj: PropertyOption) => (obj.value > max ? obj.value : max),
        localModel.value?.options[0].value,
      )
    : 0
  localModel.value?.options?.push({ value: maxValue + 1, label: '' })
}
const handleDeleteOption = (index: number) => {
  localModel.value?.options?.splice(index, 1)
}
</script>

<template>
  <Fluid class="mt-4">
    <form @submit.prevent="handleSave">
      <div
        v-if="localModel"
        class="col-12"
      >
        <div class="flex flex-col gap-4 w-full">
          <div class="flex flex-wrap gap-2 w-full">
            <label for="name">{{ t('property.name') }}<span class="p-invalid">*</span></label>
            <InputText
              v-model="localModel.name"
              required="true"
              type="text"
              id="name"
            />
            <FieldError field-name="input.name" />
          </div>
        </div>
        <div class="flex flex-col flex-wrap gap-2 w-full">
          <label for="type">{{ t('property.type') }}<span class="p-invalid">*</span></label>
          <Select
            v-model="localModel.type"
            :options="propertyTypeNames"
            option-value="value"
            option-label="label"
          />
          <FieldError field-name="input.type" />
        </div>

        <div
          v-if="localModel.type == PropertyType.Array"
          class="mt-8"
        >
          <div class="flex flex-row justify-between">
            <div class="text">{{ t('property.options.name') }}<span class="p-invalid">*</span></div>
            <Button
              icon="pi pi-plus"
              @click="handleAddOption"
            ></Button>
          </div>
          <div
            class="w-full"
            id="type-options"
          >
            <table class="table-auto">
              <thead>
                <tr>
                  <th class="w-1/2">{{ t('property.options.value') }}</th>
                  <th style="min-width: 30px">&nbsp;</th>
                </tr>
              </thead>
              <tr
                v-for="(option, index) in localModel.options"
                :key="index"
              >
                <td>
                  <InputText
                    v-model="option.label"
                    type="text"
                  />
                  <FieldError :field-name="`input.options.${index}.label`" />
                </td>
                <td>
                  <Button
                    icon="pi pi-minus"
                    severity="warn"
                    @click="handleDeleteOption(index)"
                  ></Button>
                </td>
              </tr>
            </table>
          </div>
        </div>

        <div class="flex flex-row-reverse mt-4">
          <Button
            class="ml-2"
            icon="pi pi-times"
            :label="t('common.cancel')"
            severity="secondary"
            size="small"
            @click="handleCancel"
          />
          <Button
            icon="pi pi-check"
            :label="t('common.save')"
            severity="success"
            size="small"
            @click="handleSave"
          />
        </div>
      </div>
    </form>
  </Fluid>
</template>

<style scoped></style>
