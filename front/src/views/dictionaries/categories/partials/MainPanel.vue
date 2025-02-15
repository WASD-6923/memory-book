<script setup lang="ts">
import FieldError from '@/components/errors/FieldError.vue'
import { CategoryInput } from '@/generated/graphqlOperations.ts'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const modelValue = defineModel<CategoryInput>()
</script>

<template>
  <div class="flex flex-wrap gap-2 w-full">
    <label for="name">{{ t('common.name') }}<span class="p-invalid">*</span></label>
    <InputText
      v-model="modelValue.name"
      required="true"
      type="text"
      id="name"
    />
    <FieldError field-name="input.name" />
  </div>
  <div class="flex flex-wrap gap-2 w-full">
    <label for="description">{{ t('common.description') }}</label>
    <Textarea
      v-model="modelValue.description"
      type="text"
      id="description"
    />
    <FieldError field-name="input.description" />
  </div>
</template>

<style scoped></style>
