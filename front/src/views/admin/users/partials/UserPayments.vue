<script setup lang="ts">
import { getPaymentStatusObject } from '@/composables/payments/usePaymentStatusNames.js'
import { PropType } from 'vue'
import { WalletDeposit } from '@/generated/graphqlOperations.js'
defineProps({
  walletDeposits: {
    type: Array as PropType<WalletDeposit[]>,
    required: true,
  },
  showTitle: {
    type: Boolean,
    default: true,
    required: false,
  },
})
</script>

<template>
  <DataTable
    :value="walletDeposits"
    tableStyle="min-width: 50rem"
    striped-rows
    class="mb-4"
    paginator
    :rows="10"
    :rowsPerPageOptions="[5, 10, 20, 50]"
  >
    <Column
      field="amount"
      header="Сумма"
      sort-field="AMOUNT"
      sortable
    />
    <Column
      field="status"
      header="Статус"
      sort-field="STATUS"
      sortable
    >
      <template #body="slotProps">
        <Tag :severity="getPaymentStatusObject(slotProps.data.status).severity">{{
          getPaymentStatusObject(slotProps.data.status).label
        }}</Tag>
      </template>
    </Column>
    <Column
      field="paymentSystemName"
      header="Платежная система"
      sort-field="PAYMENT_SYSTEM"
      sortable
    />
    <Column
      field="payment_id"
      header="ID платежа"
    />
    <Column
      field="currency"
      header="Валюта"
      sort-field="CURRENCY"
      sortable
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
