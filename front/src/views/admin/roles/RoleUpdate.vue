<script lang="ts" setup>
import { useRouteParams } from '@vueuse/router'
import { useRoleQuery } from '@/generated/graphqlOperations.js'
import { computed } from 'vue'
import RoleForm from '@/views/admin/roles/partials/RoleForm.vue'
import router from '@/router/index.js'
import { useTitle } from '@vueuse/core'

useTitle('Редактирование роли')
const id = useRouteParams('id', String)
const { result, loading } = useRoleQuery(
  { id: id.value },
  {
    fetchPolicy: 'no-cache',
  },
)
const model = computed(() => result.value?.role)
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
            >Редактирование роли <small>#{{ model?.name }}</small></span
          >
        </div>
      </div>
    </template>
    <template v-if="!loading" #content>
      <RoleForm v-model="model" />
    </template>
  </Card>
</template>

<style scoped></style>
