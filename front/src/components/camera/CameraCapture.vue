<script lang="ts" setup>
import { ref } from 'vue'

// Реактивная переменная для хранения URL фото
const imageUrl = ref<string | null>(null)

// Обработка выбора файла
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    // Создаем URL для отображения фото
    imageUrl.value = URL.createObjectURL(file)
    // Можно также отправить файл на сервер или обработать его
    emit('image-captured', file)
  }
}

// Отправка файла в родительский компонент
const emit = defineEmits<{
  (event: 'image-captured', file: File): void
}>()
</script>
<template>
  <div>
    <!-- Поле для выбора файла -->
    <input
      type="file"
      accept="image/*"
      capture="environment"
      @change="handleFileUpload"
    />

    <!-- Превью выбранного фото -->
    <div v-if="imageUrl">
      <img
        :src="imageUrl"
        alt="Captured Photo"
        style="max-width: 100%; height: auto"
      />
    </div>
  </div>
</template>
