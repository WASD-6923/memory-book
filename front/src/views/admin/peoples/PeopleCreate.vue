<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { ref } from 'vue'
import { People, PeopleGender, PeopleStatus } from '@/generated/graphqlOperations.js'
import router from '@/router/index.js'
import PeopleForm from '@/views/admin/peoples/partials/PeopleForm.vue'

useTitle('Создание данных жителя')
const people = ref<People>({
  municipal_id: undefined,
  first_name: null,
  last_name: null,
  middle_name: null,
  birth_date: undefined,
  date_of_death: undefined,
  birth_place: undefined,
  gender: PeopleGender.Male,
  name_of_military_commissariat: undefined,
  military_rank: undefined,
  awards: undefined,
  place_of_burial: undefined,
  biography: undefined,
  additional: undefined,
  status: PeopleStatus.Draft,
})
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
          <span>Создание данных жителя</span>
        </div>
      </div>
    </template>
    <template #content>
      <PeopleForm
        :people="people"
        mode="create"
      />
    </template>
  </Card>
</template>

<style scoped></style>
