<script lang="ts" setup>
import { onMounted, PropType, ref } from 'vue'
import {
  Municipal,
  MunicipalType,
  MunicipalUpdateInput,
  useMunicipalCreateMutation,
  useMunicipalUpdateMutation,
} from '@/generated/graphqlOperations.js'
import { useErrorsStore } from '@/stores/useErrors.js'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { IMunicipalSelect } from '@/types/address/IMunicipalSelect.js'

const router = useRouter()
const errStore = useErrorsStore()
const toast = useToast()

const props = defineProps({
  id: {
    type: String,
    required: false,
  },
  municipal: {
    type: Object as PropType<Municipal>,
    required: true,
  },
  mode: {
    type: String,
    required: false,
    default: 'update',
  },
})

const localModel = ref<Partial<MunicipalUpdateInput>>()

onMounted(() => {
  localModel.value = {
    region_id: props?.municipal?.region_id,
    name: props?.municipal?.name,
    type: props?.municipal?.type,
  }
})

const { mutate: createMutation, onDone: onDoneCreate } = useMunicipalCreateMutation()
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
      name: 'adminMunicipals',
    })
  }
})

const { mutate: updateMutation, onDone: onDoneUpdate } = useMunicipalUpdateMutation()
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
      name: 'adminMunicipals',
    })
  }
})

const handleSave = () => {
  const input = {
    name: localModel.value?.name,
    type: localModel.value?.type,
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
const types = ref<IMunicipalSelect[]>([
  {
    label: 'Городской округ',
    value: MunicipalType.CityDistrict,
  },
  {
    label: 'Муниципальный район',
    value: MunicipalType.Municipality,
  },
])
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
            <label>Тип</label>
            <Select
              class="w-full"
              :model-value="localModel.type"
              @update:modelValue="
                (value) => {
                  if (localModel) localModel.type = value
                }
              "
              :options="types"
              option-label="label"
              option-value="value"
            />
          </div>
          <div class="flex flex-wrap gap-2 w-full">
            <label>Название</label>
            <InputText v-model="localModel.name" />
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
