<script lang="ts" setup>
import FieldError from '@/components/errors/FieldError.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores/useUserStore.ts'
import { useToast } from 'primevue/usetoast'
import { Role, useUserUpdateMutation } from '@/generated/graphqlOperations.js'
import { useTitle } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import ElPhoneNumber from '@/components/ui/ElPhoneNumber.vue'

const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()
const toast = useToast()
const errors = ref({})
const submitted = ref(false)

useTitle(t('user.profile'))
const { mutate, onDone } = useUserUpdateMutation()
onDone((result) => {
  console.log(result)
  toast.add({
    severity: 'success',
    summary: 'Успех',
    detail: 'Успешно обновлено',
    life: 3000,
  })
  router.push('/')
})
const saveItem = async () => {
  await mutate({
    id: userStore.user.id,
    input: {
      first_name: userStore.user.first_name,
      last_name: userStore.user.last_name,
      middle_name: userStore.user.middle_name,
      name: userStore.user.name,
      notification_email: userStore.user.notification_email,
      phone: userStore.user.phone,
      roles: userStore.user.roles.map((role: Role) => {
        return role.id
      }),
    },
  })
}
</script>
<template>
  <div class="card">
    <div class="flex flex-row justify-between">
      <div class="text-xl text-900 font-bold">{{ t('user.profile') }}</div>
      <div class="flex flex-row gap-4">
        <Button
          icon="pi pi-save"
          :label="t('common.save')"
          size="small"
          @click="saveItem"
        />
      </div>
    </div>
    <div class="p-card-body">
      <form>
        <div class="flex flex-col md:flex-row gap-8">
          <div class="md:w-1/3">
            <div class="flex flex-col gap-4">
              <!--              <img
                :src="userStore.avatarImage as string"
                alt="avatar"
                class="mt-0 mx-auto mb-5 block shadow-2 border-circle rounded-full"
                height="150"
                width="150"
              />
                            <UploadImageModal
                              :document-type="0"
                              :documentable-id="userStore.user.id"
                              :image-id="userStore.user?.avatar?.id"
                              documentable-type="user"
                              @update-image="loadAvatar"
                            />-->
            </div>
          </div>
          <div class="md:w-2/3">
            <div class="flex flex-col gap-4">
              <div class="flex flex-col">
                <label for="last_name">{{ t('user.lastName') }}</label>
                <InputText
                  id="last_name"
                  v-model.trim="userStore.user.last_name"
                  :class="{
                    'p-invalid': submitted && 'last_name' in errors,
                  }"
                  autofocus
                  required="true"
                />
                <FieldError
                  :errors="errors"
                  field-name="input.last_name"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label for="first_name">{{ t('user.firstName') }}</label>
                <InputText
                  id="first_name"
                  v-model.trim="userStore.user.first_name"
                  :class="{
                    'p-invalid': submitted && 'first_name' in errors,
                  }"
                  required="true"
                />
                <FieldError
                  :errors="errors"
                  field-name="input.first_name"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label for="middle_name">{{ t('user.middleName') }}</label>
                <InputText
                  id="middle_name"
                  v-model.trim="userStore.user.middle_name"
                  required="false"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col md:flex-row gap-8 mt-4">
          <div class="flex flex-col gap-1 md:w-1/3">
            <label for="name">{{ t('user.email') }}</label>
            <InputText
              id="email"
              v-model.trim="userStore.user.email"
              disabled
            />
            <FieldError
              :errors="errors"
              field-name="input.notification_email"
            />
          </div>
          <div class="flex flex-col gap-1 md:w-1/3">
            <label for="name">{{ t('user.phone') }}<em style="color: red">*</em></label>
            <ElPhoneNumber
              id="phone"
              v-model="userStore.user.phone"
              :placeholder="t('auth.enterYourPhone')"
              required
              fluid
            />
            <FieldError
              :errors="errors"
              field-name="input.phone"
            />
          </div>
          <div class="flex flex-col gap-1 md:w-1/4">
            <label
              class="mb-3"
              for="itemRoles"
              >Роли</label
            >
            <div class="flex flex-row flex-wrap">
              <Tag
                v-for="(role, index) in userStore.user.roles"
                :key="index"
                severity="info"
              >
                {{ role.title }}
              </Tag>
            </div>
          </div>
          <div class="flex flex-col gap-1 md:w-1/4">
            <label
              class="mb-3"
              for="itemRoles"
              >Домашняя группа</label
            >
            <Message severity="success">{{ userStore.user.profile?.group?.name }}</Message>
          </div>
          <!--                    <div class="flex flex-col gap-1 md:w-1/4">
            <label class="mb-3">{{ t('user.status') }} </label>
            <Tag :severity="getUserStatusObject(userStore.user.status).severity">
              {{ t(getUserStatusObject(userStore.user.status).label) }}
            </Tag>
          </div>-->
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped></style>
