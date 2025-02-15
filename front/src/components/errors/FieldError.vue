<script lang="ts" setup>
import { useErrorsStore } from '@/stores/useErrors.js'

const errorStore = useErrorsStore()
defineProps({
  fieldName: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <Message
    v-if="errorStore.getErrorByField(fieldName)"
    severity="error"
    size="small"
    variant="simple"
    >{{ errorStore.getErrorByField(fieldName) }}</Message
  >
</template>
<style></style>
