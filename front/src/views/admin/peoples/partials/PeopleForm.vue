<script lang="ts" setup>
import { computed, onMounted, PropType, ref } from 'vue'
import {
  MunicipalColumns,
  People,
  PeopleGender,
  PeopleStatus,
  PeopleUpdateInput,
  SortOrder,
  useMunicipalsQuery,
  usePeopleCreateMutation,
  usePeopleUpdateMutation,
} from '@/generated/graphqlOperations.js'
import { useErrorsStore } from '@/stores/useErrors.js'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { IGenderSelect } from '@/types/people/IGenderSelect.js'
import FieldError from '@/components/errors/FieldError.vue'
import { IPeopleStatusSelect } from '@/types/people/IPeopleStatusSelect.js'
import dayjs from "dayjs";

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
const { result } = useMunicipalsQuery({
  first: 100,
  page: 1,
  orderBy: [
    {
      column: MunicipalColumns.Name,
      order: SortOrder.Asc,
    },
  ],
})
const municipals = computed(() => result.value?.municipals.data.map((item) => ({ label: item.name, value: item.id })))

const statuses = ref<IPeopleStatusSelect[]>([
  {
    label: 'Черновик',
    value: PeopleStatus.Draft,
  },
  {
    label: 'Опубликован',
    value: PeopleStatus.Published,
  },
  {
    label: 'Удален',
    value: PeopleStatus.Deleted,
  },
])
const birthDate = computed({
  get: () => (localModel.value?.birth_date ? new Date(localModel.value?.birth_date) : null),
  set: (value) => (localModel.value.birth_date = dayjs(value).format('YYYY-MM-DD')),
})
const dateOfDeath = computed({
  get: () => (localModel.value?.date_of_death ? new Date(localModel.value?.date_of_death) : null),
  set: (value) => (localModel.value.date_of_death = dayjs(value).format('YYYY-MM-DD')),
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
            <label>Муниципалитет</label>
            <Select
              class="w-full"
              :model-value="localModel.municipal_id"
              @update:modelValue="
                (value) => {
                  if (localModel) localModel.municipal_id = value
                }
              "
              :options="municipals"
              option-label="label"
              option-value="value"
            />
            <FieldError field-name="input.municipal_id" />
          </div>
          <div class="flex flex-wrap gap-2 w-full">
            <label>Фамилия</label>
            <InputText v-model="localModel.last_name" />
            <FieldError field-name="input.last_name" />
          </div>
          <div class="flex flex-wrap gap-2 w-full">
            <label>Имя</label>
            <InputText v-model="localModel.first_name" />
            <FieldError field-name="input.first_name" />
          </div>
          <div class="flex flex-wrap gap-2 w-full">
            <label>Отчество</label>
            <InputText v-model="localModel.middle_name" />
            <FieldError field-name="input.middle_name" />
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
            <FieldError field-name="input.gender" />
          </div>
          <div class="flex flex-col gap-2 w-full">
            <label>Дата рождения</label>
            <DatePicker
              v-model="birthDate"
              dateFormat="dd.mm.yy"
            />
            <FieldError field-name="input.birth_date" />
          </div>
          <div class="flex flex-wrap gap-2 w-full">
            <label>Место рождения</label>
            <InputText v-model="localModel.birth_place" />
            <FieldError field-name="input.birth_place" />
          </div>
          <div class="flex flex-col gap-2 w-full">
            <label>Дата гибели (смерти)</label>
            <DatePicker
              v-model="dateOfDeath"
              dateFormat="dd.mm.yy"
            />
            <FieldError field-name="input.date_of_death" />
          </div>
          <div class="flex flex-wrap gap-2 w-full">
            <label>Название военного комиссариата</label>
            <InputText v-model="localModel.name_of_military_commissariat" />
            <FieldError field-name="input.name_of_military_commissariat" />
          </div>
          <div class="flex flex-wrap gap-2 w-full">
            <label>Воинское звание</label>
            <InputText v-model="localModel.military_rank" />
            <FieldError field-name="input.military_rank" />
          </div>
          <div class="flex flex-wrap gap-2 w-full">
            <label>Награды</label>
            <Textarea
              rows="3"
              v-model="localModel.awards"
            />
            <FieldError field-name="input.awards" />
          </div>
          <div class="flex flex-wrap gap-2 w-full">
            <label>Место захоронения</label>
            <Textarea
              rows="3"
              v-model="localModel.place_of_burial"
            />
            <FieldError field-name="input.place_of_burial" />
          </div>
          <div class="flex flex-wrap gap-2 w-full">
            <label>Биография</label>
            <Textarea
              rows="3"
              v-model="localModel.biography"
            />
            <FieldError field-name="input.biography" />
          </div>
          <div class="flex flex-wrap gap-2 w-full">
            <label>Дополнительные сведения</label>
            <Textarea
              rows="3"
              v-model="localModel.additional"
            />
            <FieldError field-name="input.additional" />
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
              :options="statuses"
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
