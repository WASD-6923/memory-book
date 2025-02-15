<script setup lang="ts">
import { PropType } from 'vue'
import { UserPurchase } from '@/generated/graphqlOperations.js'
defineProps({
  userPurchases: {
    type: Array as PropType<UserPurchase[]>,
    required: true,
  },
})
</script>

<template>
  <DataTable
    :value="userPurchases"
    tableStyle="min-width: 50rem"
    striped-rows
    class="mb-4"
    paginator
    :rows="10"
    :rowsPerPageOptions="[5, 10, 20, 50]"
  >
    <Column
      field="cost"
      header="Сумма"
      sort-field="COST"
      sortable
    />
    <Column
      field="type"
      header="Тип"
      sort-field="TYPE"
      sortable
    />
    <Column
      field="comment"
      header="Комментарий"
    />
    <Column
      field="created_at"
      header="Дата/время создания"
      sort-field="CREATED_AT"
      sortable
    />
  </DataTable>
</template>

<style scoped></style>
