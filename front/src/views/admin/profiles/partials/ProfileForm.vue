<script lang="ts" setup>
import { computed, onMounted, PropType, ref } from 'vue'
import {
  MunicipalColumns,
  Profile,
  ProfileUpdateInput,
  SortOrder,
  useMunicipalsQuery,
  useProfileUpdateMutation,
} from '@/generated/graphqlOperations.js'
import { useErrorsStore } from '@/stores/useErrors.js'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import FieldError from '@/components/errors/FieldError.vue'

const { t } = useI18n()
const router = useRouter()
const errStore = useErrorsStore()
const toast = useToast()

const props = defineProps({
  id: {
    type: String,
    required: false,
  },
  profile: {
    type: Object as PropType<Profile>,
    required: true,
  },
  mode: {
    type: String,
    required: false,
    default: 'update',
  },
})

const localModel = ref<Partial<ProfileUpdateInput>>()

onMounted(() => {
  localModel.value = {
    local_government: props?.profile?.local_government,
    name: props?.profile?.name,
    municipal_id: props?.profile?.municipal_id,
  }
})

const { mutate: updateMutation, onDone: onDoneUpdate } = useProfileUpdateMutation()
onDoneUpdate((result) => {
  if (result.data) {
    errStore.$reset()
    toast.add({
      severity: 'success',
      summary: t('common.success'),
      detail: t('user.updateSuccess'),
      life: 3000,
    })
    router.push({
      name: 'adminProfiles',
    })
  }
})

const handleSave = () => {
  const input = {
    local_government: localModel.value?.local_government,
    name: localModel.value?.name,
    municipal_id: localModel.value?.municipal_id,
  }
  updateMutation({
    id: props.id as string,
    input: input,
  })
}
const handleCancel = () => {
  router.push('/admin/profiles')
}
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
            <label>Орган местного самоуправления/Военного самоуправления</label>
            <InputText v-model="localModel.local_government" />
            <FieldError field-name="input.local_government" />
          </div>
          <div class="flex flex-wrap gap-2 w-full">
            <label>Наименование органа</label>
            <InputText v-model="localModel.name" />
            <FieldError field-name="input.name" />
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
