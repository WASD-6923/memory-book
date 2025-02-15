<script lang="js">
import { defineComponent } from 'vue'
import dayjs from 'dayjs'

console.log(dayjs().format('DD.MM.YYYY'))
export default defineComponent({
  name: 'ElDate',
  props: ['date'],
})
</script>

<template>
  <span>{{dayjs().format('DD.MM.YYYY')}}</span>
</template>

<style scoped></style>
