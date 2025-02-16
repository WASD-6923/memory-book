<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { computed } from 'vue'
import { useRouteParams } from '@vueuse/router'
import { People, usePeopleQuery } from '@/generated/graphqlOperations.js'
import router from '@/router/index.js'
import PeopleForm from '@/views/admin/peoples/partials/PeopleForm.vue'

useTitle('Редактирование данных жителя')
const modelId = useRouteParams('id')

const { result, loading } = usePeopleQuery({ id: modelId.value as string }, { fetchPolicy: 'no-cache' })

const people = computed(() => result.value?.people as People)
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
            >Редактирование данных жителя:
            <small>#{{ people?.last_name }} {{ people?.first_name }} {{ people?.middle_name }}</small></span
          >
        </div>
      </div>
    </template>
    <template #content>
      <PeopleForm
        v-if="!loading"
        :people="people"
        :id="modelId as string"
      />
    </template>
  </Card>
</template>

<style scoped></style>
