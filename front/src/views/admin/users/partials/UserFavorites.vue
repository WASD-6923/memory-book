<script setup lang="ts">
import { PropType } from 'vue'
import { Favorite } from '@/generated/graphqlOperations.js'

defineProps({
  favorites: {
    type: Array as PropType<Favorite[]>,
    required: true,
  },
})
</script>

<template>
  <DataTable
    :value="favorites"
    tableStyle="min-width: 50rem"
    striped-rows
    class="mb-4"
    paginator
    :rows="10"
    :rowsPerPageOptions="[5, 10, 20, 50]"
  >
    <Column
      field="lot_id"
      header="Лот"
      sort-field="LOT_ID"
      sortable
    >
      <template #body="slotProps">
        <RouterLink :to="`/admin/car-lots/view/${slotProps.data.lot_id}`">
          <div class="text-primary">
            {{ slotProps.data.carLot.lot_number }}
          </div>
        </RouterLink>
      </template>
    </Column>
    <Column
      field="created_at"
      header="Дата/время создания"
      sort-field="CREATED_AT"
      sortable
    />
  </DataTable>
</template>

<style scoped></style>
