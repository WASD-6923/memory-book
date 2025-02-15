<script setup lang="ts">
import { onMounted, PropType, ref, watch } from 'vue'
import { IMask } from '@/types/IMask.js'

const props = defineProps({
  modelValue: [String, Number],
  title: String,
  maskObject: {
    type: Object as PropType<IMask>,
  },
  required: {
    type: Boolean,
    required: false,
    default: false,
  },
  labelClass: {
    type: String,
    default: null,
  },
  error: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: null,
    required: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const localMask = ref({
  mask: props.maskObject?.mask,
  overwrite: false,
  unmask: true,
  type: 'tel',
  definitions: {
    '#': /./,
  },
})

watch(
  () => props.maskObject?.mask,
  () => {
    localMask.value.mask = props.maskObject?.mask
  },
)

const onInput = (e: KeyboardEvent) => {
  const input = e.target as HTMLInputElement
  emit('update:modelValue', input.value?.replace(/\D/g, ''))
}
onMounted(() => {
  emit('update:modelValue', props.modelValue)
})
</script>

<template>
  <input
    v-imask="localMask"
    :value="modelValue"
    :placeholder="placeholder"
    @keyup="onInput"
    class="p-inputtext p-component p-filled w-full"
  />
</template>
