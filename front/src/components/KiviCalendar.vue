<script setup lang="ts">
import { computed } from 'vue'
import moment from 'moment/moment'

const props = defineProps({
  format: {
    type: String,
    required: false,
    default: 'date',
  },
})
const model = defineModel()
const computedModel = computed({
  get() {
    return model.value ? moment(model.value).format('DD.MM.YYYY') : undefined
  },
  set(value) {
    if (props.format === 'date') {
      model.value = value !== null ? moment(value).format('YYYY-MM-DD') : ''
    } else {
      model.value =
        value !== null ? moment(value).format('YYYY-MM-DDT00:00:00Z') : ''
    }
  },
})
const clearValue = () => {
  model.value = undefined
}
</script>

<template>
  <div class="calendar-wrapper">
    <Calendar
      v-model="computedModel"
      date-format="dd.mm.yy"
      showIcon
      :showOnFocus="true"
      iconDisplay="button"
    >
    </Calendar>
    <span v-if="computedModel" class="clear-date" @click="clearValue">
      <i class="pi pi-times" />
    </span>
  </div>
</template>

<style scoped>
.calendar-wrapper {
  position: relative;
}
.clear-date {
  position: absolute;
  top: 10px;
  right: 44px;
  cursor: pointer;
}
</style>
