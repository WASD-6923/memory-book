<script setup lang="ts">
import { computed, onMounted, onUnmounted, PropType, ref } from 'vue'
import {
  AccessLevel,
  ApplicationSample,
  ApplicationSampleInput,
  useApplicationSampleCreateMutation,
  useApplicationSampleUpdateMutation,
} from '@/generated/graphqlOperations.ts'
import { useErrorsStore } from '@/stores/useErrors.ts'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import FieldError from '@/components/errors/FieldError.vue'
import { useAccessLevelNames } from '@/composables/realities/useAccessLevelNames.ts'
import { IEnumObject } from '@/types/IEnumObject.ts'

const router = useRouter()
const { t } = useI18n()
const errStore = useErrorsStore()
errStore.clearStore()
const toast = useToast()
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
  value: {
    type: Object as PropType<ApplicationSample>,
    required: false,
  },
})

const localModel = ref<Partial<ApplicationSample>>()
onMounted(() => {
  if (props.mode === 'update') {
    localModel.value = {
      access_level: props.value?.access_level,
      name: props.value?.name,
      description: props.value?.description,
    }
  } else {
    localModel.value = {
      access_level: AccessLevel.Private,
      name: undefined,
      description: undefined,
    }
  }
})
onUnmounted(() => {
  errStore.clearStore()
})
const { mutate: createMutation, onDone: onDoneStore } = useApplicationSampleCreateMutation()

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
      name: 'applicationSamplesIndex',
    })
  }
})

const { mutate: updateMutation, onDone: onDoneUpdate } = useApplicationSampleUpdateMutation()
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
      name: 'applicationSamplesIndex',
    })
  }
})
const handleSave = () => {
  const input: ApplicationSampleInput = {
    name: localModel.value?.name,
    description: localModel.value?.description,
    access_level: localModel.value?.access_level,
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
  router.push({
    name: 'propertyIndex',
  })
}

const accessLevels = computed(() =>
  useAccessLevelNames.map((al: IEnumObject) => ({ label: t(al.label), value: al.value })),
)
</script>

<template>
  <Fluid class="mt-4">
    <form @submit.prevent="handleSave">
      <div
        v-if="localModel"
        class="col-12"
      >
        <div class="flex flex-wrap gap-2 w-full">
          <label for="access_level">{{ t('categories.accessLevel') }}<span class="p-invalid">*</span></label>
          <Select
            v-model="localModel.access_level"
            :options="accessLevels"
            option-value="value"
            option-label="label"
            id="access_level"
            class="w-full"
            disabled
          />
          <FieldError field-name="input.access_level" />
        </div>
        <div class="flex flex-wrap gap-2 w-full">
          <label for="name">{{ t('common.name') }}<span class="p-invalid">*</span></label>
          <InputText
            v-model="localModel.name"
            required="true"
            type="text"
            id="name"
          />
          <FieldError field-name="input.name" />
        </div>
        <div class="flex flex-wrap gap-2 w-full">
          <label for="description">{{ t('common.description') }}</label>
          <Textarea
            v-model="localModel.description"
            type="text"
            id="description"
            rows="3"
          />
          <FieldError field-name="input.description" />
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
