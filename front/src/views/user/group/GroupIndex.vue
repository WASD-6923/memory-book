<script setup lang="ts">
import { useGroupQuery } from '@/generated/graphqlOperations.js'
import { useUserStore } from '@/stores/useUserStore.js'
import { computed } from 'vue'

const userStore = useUserStore()
const { result, loading } = useGroupQuery({
  id: userStore.user.profile.group_id,
})
const group = computed(() => result.value?.group)
</script>

<template>
  <Card v-if="!loading">
    <template #title> Моя группа {{ group?.name }} </template>
    <template #content>

    </template>
  </Card>
</template>

<style scoped></style>
