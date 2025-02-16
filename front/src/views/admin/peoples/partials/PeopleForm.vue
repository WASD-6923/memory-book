<script lang="ts" setup>
import { onMounted, PropType, ref } from 'vue'
import {
  People,
  PeopleGender,
  PeopleUpdateInput,
  usePeopleCreateMutation,
  usePeopleUpdateMutation,
} from '@/generated/graphqlOperations.js'
import { useErrorsStore } from '@/stores/useErrors.js'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { IGenderSelect } from '@/types/people/IGenderSelect.js'

const router = useRouter()
const errStore = useErrorsStore()
const toast = useToast()

const props = defineProps({
  id: {
    type: String,
    required: false,
  },
  people: {
    type: Object as PropType<People>,
    required: true,
  },
  mode: {
    type: String,
    required: false,
    default: 'update',
  },
})

const localModel = ref<Partial<PeopleUpdateInput>>()

onMounted(() => {
  localModel.value = {
    municipal_id: props?.people?.municipal_id,
    first_name: props?.people?.first_name,
    last_name: props?.people?.last_name,
    middle_name: props?.people?.middle_name,
    birth_date: props?.people?.birth_date,
    date_of_death: props?.people?.date_of_death,
    birth_place: props?.people?.birth_place,
    gender: props?.people?.gender,
    name_of_military_commissariat: props?.people?.name_of_military_commissariat,
    military_rank: props?.people?.military_rank,
    awards: props?.people?.awards,
    place_of_burial: props?.people?.place_of_burial,
    biography: props?.people?.biography,
    additional: props?.people?.additional,
    status: props?.people?.status,
  }
})

const { mutate: createMutation, onDone: onDoneCreate } = usePeopleCreateMutation()
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

const { mutate: updateMutation, onDone: onDoneUpdate } = usePeopleUpdateMutation()
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
      name: 'adminPeoples',
    })
  }
})

const handleSave = () => {
  const input = {
    municipal_id: localModel.value?.municipal_id,
    first_name: localModel.value?.first_name,
    last_name: localModel.value?.last_name,
    middle_name: localModel.value?.middle_name,
    birth_date: localModel.value?.birth_date,
    date_of_death: localModel.value?.date_of_death,
    birth_place: localModel.value?.birth_place,
    gender: localModel.value?.gender,
    name_of_military_commissariat: localModel.value?.name_of_military_commissariat,
    military_rank: localModel.value?.military_rank,
    awards: localModel.value?.awards,
    place_of_burial: localModel.value?.place_of_burial,
    biography: localModel.value?.biography,
    additional: localModel.value?.additional,
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
    name: 'adminPeoples',
  })
}
const genders = ref<IGenderSelect[]>([
  {
    label: 'Мужчина',
    value: PeopleGender.Male,
  },
  {
    label: 'Женщина',
    value: PeopleGender.Female,
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
            <label>Фамилия</label>
            <InputText v-model="localModel.last_name" />
          </div>
          <div class="flex flex-wrap gap-2 w-full">
            <label>Имя</label>
            <InputText v-model="localModel.first_name" />
          </div>
          <div class="flex flex-wrap gap-2 w-full">
            <label>Отчество</label>
            <InputText v-model="localModel.middle_name" />
          </div>
          <div class="flex flex-wrap gap-2 w-full">
            <label>Пол</label>
            <Select
              class="w-full"
              :model-value="localModel.gender"
              @update:modelValue="
                (value) => {
                  if (localModel) localModel.gender = value
                }
              "
              :options="genders"
              option-label="label"
              option-value="value"
            />
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
