<script setup lang="ts">
import { ref } from 'vue'
import { useTitle } from '@vueuse/core'
import { AdminStatistics, useAdminStatisticsQuery } from '@/generated/graphqlOperations.js'
import { useFormatNumber } from '@/composables/useFormatNumber'

useTitle('Статистика')
const adminStatistics = ref<AdminStatistics>()
const { onResult, loading } = useAdminStatisticsQuery({ fetchPolicy: 'no-cache' })
onResult((queryResult) => {
  adminStatistics.value = queryResult.data.adminStatistics
})
</script>

<template>
  <div
    class="grid grid-cols-12 gap-8"
    v-if="!loading"
  >
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
      <div class="card mb-0">
        <div class="flex justify-between mb-4">
          <div>
            <span class="block text-muted-color font-medium mb-4">Пользователи</span>
            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
              {{ useFormatNumber(adminStatistics?.users) }}
            </div>
          </div>
          <div
            class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-users text-blue-500 !text-xl"></i>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>
