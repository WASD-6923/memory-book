<script lang="ts" setup>
import { computed, onMounted, PropType, ref } from 'vue'
import {
  useWarCreateMutation,
  useWarUpdateMutation,
  War,
  WarStatus,
  WarUpdateInput,
} from '@/generated/graphqlOperations.js'
import { useErrorsStore } from '@/stores/useErrors.js'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import FieldError from '@/components/errors/FieldError.vue'
import dayjs from 'dayjs'
import { IWarStatusSelect } from '@/types/war/IWarStatusSelect.js'

const router = useRouter()
const errStore = useErrorsStore()
const toast = useToast()

const props = defineProps({
  id: {
    type: String,
    required: false,
  },
  war: {
    type: Object as PropType<War>,
    required: true,
  },
  mode: {
    type: String,
    required: false,
    default: 'update',
  },
})

const localModel = ref<Partial<WarUpdateInput>>()

onMounted(() => {
  localModel.value = {
    name: props?.war?.name,
    start_date: props?.war?.start_date,
    end_date: props?.war?.end_date,
    description: props?.war?.description,
    reason: props?.war?.reason,
    status: props?.war?.status,
  }
})

const { mutate: createMutation, onDone: onDoneCreate } = useWarCreateMutation()
onDoneCreate((result) => {
  if (result.data) {
    errStore.$reset()
    toast.add({
      severity: 'success',
      summary: 'Успех',
      detail: 'Удачно добавлено',
      life: 3000,
    })
    router.push({
      name: 'adminWars',
    })
  }
})

const { mutate: updateMutation, onDone: onDoneUpdate } = useWarUpdateMutation()
onDoneUpdate((result) => {
  if (result.data) {
    errStore.$reset()
    toast.add({
      severity: 'success',
      summary: 'Успех',
      detail: 'Удачно обновлено',
      life: 3000,
    })
    router.push({
      name: 'adminWars',
    })
  }
})

const handleSave = () => {
  const input = {
    name: localModel.value?.name,
    start_date: localModel.value?.start_date,
    end_date: localModel.value?.end_date,
    description: localModel.value?.description,
    reason: localModel.value?.reason,
    status: localModel.value?.status,
  }
  if (props.mode === 'create') {
    createMutation({ input: input })
    return
  }
  updateMutation({
    id: props.id as string,
    input: input,
  })
}
const handleCancel = () => {
  router.push({
    name: 'adminMunicipals',
  })
}
const types = ref<IWarStatusSelect[]>([
  {
    label: 'Закончен',
    value: WarStatus.Ended,
  },
  {
    label: 'В процессе',
    value: WarStatus.InProcess,
  },
  {
    label: 'Переговоры',
    value: WarStatus.Negotiations,
  },
])
const startDate = computed({
  get: () => (localModel.value?.start_date ? new Date(localModel.value?.start_date) : null),
  set: (value) => (localModel.value.start_date = dayjs(value).format('YYYY-MM-DD')),
})
const endDate = computed({
  get: () => (localModel.value?.end_date ? new Date(localModel.value?.end_date) : null),
  set: (value) => (localModel.value.end_date = dayjs(value).format('YYYY-MM-DD')),
})
</script>

<template>
  <Fluid>
    <form @submit.prevent="handleSave">
      <div
        v-if="localModel"
        class="col-12"
      >
        <div class="flex flex-col gap-4 w-full">
          <div class="flex flex-wrap gap-2 w-full">
            <label>Название</label>
            <InputText v-model="localModel.name" />
            <FieldError field-name="input.name" />
          </div>
          <div class="flex flex-wrap gap-2 w-full">
            <label>Описание</label>
            <Textarea
              rows="3"
              v-model="localModel.description"
            />
            <FieldError field-name="input.description" />
          </div>
          <div class="flex flex-wrap gap-2 w-full">
            <label>Причины</label>
            <Textarea
              rows="3"
              v-model="localModel.reason"
            />
            <FieldError field-name="input.reason" />
          </div>
          <div class="flex flex-col gap-2 w-full">
            <label>Дата начала</label>
            <DatePicker
              v-model="startDate"
              dateFormat="dd.mm.yy"
              showButtonBar
            />
            <FieldError field-name="input.start_date" />
          </div>
          <div class="flex flex-col gap-2 w-full">
            <label>Дата окончания</label>
            <DatePicker
              v-model="endDate"
              dateFormat="dd.mm.yy"
            />
            <FieldError field-name="input.end_date" />
          </div>
          <div class="flex flex-wrap gap-2 w-full">
            <label>Статус</label>
            <Select
              class="w-full"
              :model-value="localModel.status"
              @update:modelValue="
                (value) => {
                  if (localModel) localModel.status = value
                }
              "
              :options="types"
              option-label="label"
              option-value="value"
            />
            <FieldError field-name="input.status" />
          </div>
        </div>

        <div class="flex flex-row-reverse mt-4">
          <Button
            class="ml-2"
            icon="pi pi-times"
            label="Отменить"
            severity="secondary"
            size="small"
            @click="handleCancel"
          />
          <Button
            icon="pi pi-check"
            label="Сохранить"
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
