<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import UserForm from '@/views/admin/users/partials/UserForm.vue'
import { computed } from 'vue'
import { useRouteParams } from '@vueuse/router'
import { User, useUserQuery } from '@/generated/graphqlOperations.js'
import router from '@/router/index.js'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
useTitle(t('user.update'))
const modelId = useRouteParams('id')

const { result, loading } = useUserQuery({ id: modelId.value as string }, { fetchPolicy: 'no-cache' })

const user = computed(() => result.value?.user as User)
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
            >{{ t('user.update') }} <small>#{{ user?.name }}</small></span
          >
        </div>
      </div>
    </template>
    <template #content>
      <UserForm
        v-if="!loading"
        :user="user"
        :id="modelId as string"
      />
    </template>
  </Card>
</template>

<style scoped></style>
