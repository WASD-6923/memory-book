<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import ProfileForm from '@/views/admin/profiles/partials/ProfileForm.vue'
import { computed } from 'vue'
import { useRouteParams } from '@vueuse/router'
import { Profile, useProfileQuery } from '@/generated/graphqlOperations.js'
import router from '@/router/index.js'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
useTitle(t('user.update'))
const modelId = useRouteParams('id')

const { result, loading } = useProfileQuery({ id: modelId.value as string }, { fetchPolicy: 'no-cache' })

const profile = computed(() => result.value?.profile as Profile)
</script>

<template>
  <Card>
    <template #title>
      <div class="flex flex-row align-items-center">
        <Button
          icon="pi pi-arrow-left"
          severity="primary"
          size="small"
          @click="router.go(-1)"
        />
        <div class="ml-2">
          <span
            >Редактирование профиля пользователя: <small>#{{ profile?.user.fullName }}</small></span
          >
        </div>
      </div>
    </template>
    <template #content>
      <ProfileForm
        v-if="!loading"
        :profile="profile"
        :id="modelId as string"
      />
    </template>
  </Card>
</template>

<style scoped></style>
