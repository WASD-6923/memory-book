<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { computed } from 'vue'
import { useRouteParams } from '@vueuse/router'
import { People, usePeopleQuery } from '@/generated/graphqlOperations.js'
import router from '@/router/index.js'
import { useFormatDate } from '../../../composables/useFormatDate.js'

useTitle('Просмотр данных жителя')
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
            >Просмотр данных жителя:
            <small>#{{ people?.last_name }} {{ people?.first_name }} {{ people?.middle_name }}</small></span
          >
        </div>
      </div>
    </template>
    <template #content>
      <div class="">
        <div class="flex flex-col">
          <div class="text-color-secondary">ФИО</div>
          <div class="mb-2">{{ people?.last_name }} {{ people?.first_name }} {{ people?.middle_name }}</div>
          <div class="text-color-secondary">Дата рождения</div>
          <div class="mb-2">{{ people?.birth_date ? useFormatDate(people.birth_date) : '' }}</div>
          <div class="text-color-secondary">Место рождения</div>
          <div class="mb-2">{{ people?.birth_place }}</div>
          <div class="text-color-secondary">Дата гибели (смерти)</div>
          <div class="mb-2">{{ people?.date_of_death ? useFormatDate(people.date_of_death) : '' }}</div>
          <div class="text-color-secondary">Военный комиссариат</div>
          <div class="mb-2">{{ people?.name_of_military_commissariat }}</div>
          <div class="text-color-secondary">Звание</div>
          <div class="mb-2">{{ people?.military_rank }}</div>
          <div class="text-color-secondary">Награды</div>
          <div class="mb-2">{{ people?.awards }}</div>
          <div class="text-color-secondary">Место захоронения</div>
          <div class="mb-2">{{ people?.place_of_burial }}</div>
          <div class="text-color-secondary">Биография</div>
          <div class="mb-2">{{ people?.biography }}</div>
          <div class="text-color-secondary">Дополнительно</div>
          <div class="mb-2">{{ people?.additional }}</div>
          <div class="text-color-secondary">Статус</div>
          <div class="mb-2">{{ people?.status }}</div>
        </div>

      </div>
    </template>
  </Card>
</template>

<style scoped></style>
