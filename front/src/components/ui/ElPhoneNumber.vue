<script setup lang="ts">
import ElMaskInput from '@/components/ui/ElMaskInput.vue'
import phoneCountryCodes from '@/mocks/phoneCountryCodes.js'
import { IMask } from '@/types/IMask.js'
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
  },
  required: {
    type: Boolean,
    default: false,
    required: false,
  },
})
const defaultMask = phoneCountryCodes.find((m) => m.country === 'unknown')
const mask = ref<IMask>(defaultMask as IMask)

const handleCheckMask = () => {
  const number = props.modelValue?.replace(/\D/g, '')
  const [result] = phoneCountryCodes
    .filter((m) => String(number)?.indexOf(m.startsWith) === 0)
    .sort((a, b) => (a.startsWith.length > b.startsWith.length ? -1 : 1))
  mask.value = result || defaultMask
}

const emit = defineEmits(['update:modelValue', 'update-mask'])

const onInput = (value: string) => {
  emit('update:modelValue', value)
  emit('update-mask', mask.value.countryCode)
  setTimeout(() => handleCheckMask(), 50)
}
</script>

<template>
  <ElMaskInput
    :modelValue="modelValue"
    :mask-object="mask"
    :required="required"
    v-bind="$attrs"
    @update:modelValue="onInput"
  />
</template>
