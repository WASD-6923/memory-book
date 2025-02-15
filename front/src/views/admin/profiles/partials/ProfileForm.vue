<script lang="ts" setup>
import { computed, onMounted, PropType, ref } from 'vue'
import { Profile, ProfileUpdateInput, useGroupsQuery, useProfileUpdateMutation } from '@/generated/graphqlOperations.js'
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

const { result: groupsResult } = useGroupsQuery({
  first: 1000,
  page: 1,
})
const groups = computed(() => groupsResult.value?.groups.data.map((t) => ({ id: t.id.toString(), name: t.name })))
const localModel = ref<Partial<ProfileUpdateInput>>()

onMounted(() => {
  localModel.value = {
    group_id: props?.profile?.group_id,
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
    group_id: localModel.value?.group_id,
  }
  updateMutation({
    id: props.id as string,
    input: input,
  })
}
const handleCancel = () => {
  router.push('/admin/profiles')
}
</script>

<template>
  <Fluid>
    <form @submit.prevent="handleSave">
      <div
        v-if="localModel"
        class="col-12"
      >
        <div class="flex flex-col gap-4 w-full">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex flex-wrap gap-2 w-full">
              <label>Домашняя группа</label>
              <Select
                class="w-full"
                :model-value="localModel.group_id"
                @update:modelValue="
                  (value) => {
                    if (localModel) localModel.group_id = value
                  }
                "
                :options="groups"
                option-label="name"
                option-value="id"
              />
            </div>
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
