<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { computed } from 'vue'
import { useRouteParams } from '@vueuse/router'
import { User, useUserForAdminQuery } from '@/generated/graphqlOperations.js'
import router from '@/router/index.js'
import { useI18n } from 'vue-i18n'
import UserViewPanel from '@/views/admin/users/partials/UserViewPanel.vue'

const { t } = useI18n()
useTitle(t('user.update'))
const modelId = useRouteParams('id')

const { result, loading } = useUserForAdminQuery({ id: modelId.value as string }, { fetchPolicy: 'no-cache' })

const user = computed(() => result.value?.user as User)

const handleLoginAsUser = () => {

}
</script>

<template>
  <Card>
    <template #title>
      <div class="flex flex-row justify-between">
        <div class="flex flex-row align-items-center">
          <Button
            icon="pi pi-arrow-left"
            severity="primary"
            size="small"
            @click="router.go(-1)"
          />
          <div class="ml-2">
            <span
              >Просмотр данных пользователя <small>#{{ user?.name }}</small></span
            >
          </div>
        </div>
      </div>
    </template>
    <template #content>
<!--      <UserViewPanel
        v-if="!loading"
        :user="user"
        :id="modelId as string"
      />-->
    </template>
  </Card>
</template>

<style scoped></style>
