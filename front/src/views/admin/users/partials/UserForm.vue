<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import FieldError from '@/components/errors/FieldError.vue'
import {
  Role,
  UserCreateInput,
  useRolesQuery,
  UserStatus,
  UserUpdateInput,
  useUserCreateMutation,
  useUserUpdateMutation,
} from '@/generated/graphqlOperations.js'
import { useErrorsStore } from '@/stores/useErrors.js'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ElPhoneNumber from '@/components/ui/ElPhoneNumber.vue'
import { useUserStatusNames } from '@/composables/user/useUserStatusNames.ts'
import { IEnumObject } from '@/types/IEnumObject.ts'

const { t } = useI18n()
const router = useRouter()
const errStore = useErrorsStore()
const toast = useToast()

const props = defineProps({
  id: {
    type: String,
    required: false,
  },
  user: {
    type: Object,
    required: false,
  },
  mode: {
    type: String,
    required: false,
    default: 'update',
  },
})

const { result: roleResult } = useRolesQuery()
const roles = computed(() => roleResult.value?.roles)
const localModel = ref<Partial<UserCreateInput | UserUpdateInput>>()

onMounted(() => {
  if (props.mode === 'update') {
    localModel.value = {
      name: props?.user?.name,
      email: props?.user?.email,
      roles: props?.user?.roles.map((role: Role) => {
        return role.id
      }),
      notification_email: props?.user?.notification_email,
      phone: props?.user?.phone,
      first_name: props?.user?.first_name,
      last_name: props?.user?.last_name,
      middle_name: props?.user?.middle_name,
      status: props?.user?.status,
    }
  } else {
    localModel.value = {
      name: undefined,
      email: undefined,
      password: undefined,
      roles: undefined,
      notification_email: undefined,
      phone: undefined,
      first_name: undefined,
      last_name: undefined,
      middle_name: undefined,
      status: UserStatus.Active,
    }
  }
})
const { mutate: createMutation, onDone: onDoneStore } = useUserCreateMutation()

onDoneStore((result) => {
  if (result.data) {
    errStore.$reset()
    toast.add({
      severity: 'success',
      summary: t('common.success'),
      detail: t('user.createSuccess'),
      life: 3000,
    })
    router.push({
      name: 'adminUsers',
    })
  }
})

const { mutate: updateMutation, onDone: onDoneUpdate } = useUserUpdateMutation()
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
      name: 'adminUsers',
    })
  }
})

const handleSave = () => {
  const input = {
    name: localModel.value?.email,
    email: localModel.value?.email,
    password: localModel.value?.password,
    roles: localModel.value?.roles,
    notification_email: localModel.value?.notification_email,
    phone: localModel.value?.phone,
    first_name: localModel.value?.first_name,
    last_name: localModel.value?.last_name,
    middle_name: localModel.value?.middle_name,
    status: localModel.value?.status,
  }
  if (props.mode === 'create') {
    createMutation({
      input: input,
    })
  } else {
    updateMutation({
      id: props.id as string,
      input: input,
    })
  }
  console.log('save')
}
const handleCancel = () => {
  router.push('/admin/users')
}
const statusNames = computed(() =>
  useUserStatusNames.map((item: IEnumObject) => ({ value: item.value, label: t(item.label) })),
)
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
              <label for="last_name">{{ t('user.lastName') }}<span class="p-invalid">*</span></label>
              <InputText
                v-model="localModel.last_name"
                required="true"
                type="text"
                id="last_name"
              />
              <FieldError field-name="input.last_name" />
            </div>
            <div class="flex flex-wrap gap-2 w-full">
              <label for="first_name">{{ t('user.firstName') }}<span class="p-invalid">*</span></label>
              <InputText
                v-model="localModel.first_name"
                required="true"
                type="text"
                id="first_name"
              />
              <FieldError field-name="input.first_name" />
            </div>
            <div class="flex flex-wrap gap-2 w-full">
              <label for="middle_name">{{ t('user.middleName') }}</label>
              <InputText
                v-model="localModel.middle_name"
                required="false"
                id="middle_name"
              />
              <FieldError field-name="input.middle_name" />
            </div>
          </div>

          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex flex-wrap gap-2 w-full">
              <label for="email">{{ t('user.email') }}<span class="p-invalid">*</span></label>
              <InputText
                v-model="localModel.email"
                autocomplete="email"
                name="input-mail"
                placeholder="Email"
                required
                id="email"
              />
              <FieldError field-name="input.email" />
            </div>
            <div class="flex flex-wrap gap-2 w-full">
              <label for="notification_email">{{ t('user.notificationEmail') }}</label>
              <InputText
                v-model="localModel.notification_email"
                required="false"
                id="notification_email"
              />
              <FieldError field-name="input.notification_email" />
            </div>
            <div class="flex flex-wrap gap-2 w-full">
              <label for="phone">{{ t('user.phone') }}</label>
              <ElPhoneNumber
                id="phone"
                v-model="localModel.phone"
                :placeholder="t('auth.enterYourPhone')"
                required
                fluid
              />
              <FieldError field-name="input.phone" />
            </div>
          </div>

          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex flex-wrap flex-col gap-2 w-full">
              <label for="password">{{ t('user.password') }}</label>
              <Password
                id="password"
                v-model="localModel.password"
                autocomplete="new-password"
                toggleMask
              >
                <template #header>
                  <h6>{{ t('user.enterPassword') }}</h6>
                </template>
                <template #footer>
                  <Divider />
                  <p class="mt-2">{{ t('user.offer') }}</p>
                  <ul
                    class="pl-2 ml-2 mt-0"
                    style="line-height: 1.5"
                  >
                    <li>{{ t('user.offer1') }}</li>
                    <li>{{ t('user.offer2') }}</li>
                    <li>{{ t('user.offer3') }}</li>
                    <li>{{ t('user.offer4') }}</li>
                  </ul>
                </template>
              </Password>
              <FieldError field-name="input.password" />
            </div>
            <div class="flex flex-wrap gap-2 w-full">
              <label for="short_name">{{ t('user.role') }}</label>
              <MultiSelect
                v-model="localModel.roles"
                :options="roles"
                class="w-full"
                optionLabel="title"
                optionValue="id"
                :placeholder="t('user.selectRole')"
              />
              <FieldError field-name="input.roles" />
            </div>
            <div class="flex flex-wrap gap-2 w-full">
              <label for="short_name">{{ t('user.status') }}</label>
              <Select
                v-model="localModel.status"
                :options="statusNames"
                class="w-full"
                optionLabel="label"
                optionValue="value"
                :placeholder="t('user.selectStatus')"
              />
              <FieldError field-name="input.roles" />
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
