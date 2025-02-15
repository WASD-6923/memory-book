<template>
  <div>
    <!-- Видео с камеры -->
    <video
      ref="videoElement"
      autoplay
      style="max-width: 100%; height: auto"
    ></video>

    <!-- Кнопка для съемки фото -->
    <button
      @click="takePhoto"
      :disabled="!isCameraReady"
    >
      Сделать фото
    </button>

    <!-- Отображение сделанного фото -->
    <div v-if="photoUrl">
      <h3>Ваше фото:</h3>
      <img
        :src="photoUrl"
        alt="Captured Photo"
        style="max-width: 100%; height: auto"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Ссылка на элемент <video>
const videoElement = ref<HTMLVideoElement | null>(null)

// URL сделанного фото
const photoUrl = ref<string | null>(null)

// Флаг, указывающий, что камера готова
const isCameraReady = ref<boolean>(false)

// Поток данных с камеры
let mediaStream: MediaStream | null = null

// Запуск камеры
const startCamera = async (): Promise<void> => {
  try {
    // Получаем доступ к камере
    mediaStream = await navigator.mediaDevices.getUserMedia({ video: true })
    if (videoElement.value) {
      videoElement.value.srcObject = mediaStream // Подключаем поток к элементу <video>
      isCameraReady.value = true // Камера готова
    }
  } catch (error) {
    console.error('Ошибка доступа к камере:', error)
    alert('Не удалось получить доступ к камере.')
  }
}

// Сделать фото
const takePhoto = (): void => {
  const video = videoElement.value
  if (!video) return

  const canvas = document.createElement('canvas')
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight

  // Рисуем текущий кадр видео на canvas
  const context = canvas.getContext('2d')
  if (context) {
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Преобразуем canvas в URL изображения
    photoUrl.value = canvas.toDataURL('image/png')
  }
}

// Остановка камеры
const stopCamera = (): void => {
  if (mediaStream) {
    mediaStream.getTracks().forEach((track) => track.stop()) // Останавливаем все треки
  }
}

// Запускаем камеру при монтировании компонента
onMounted(() => {
  startCamera()
})

// Останавливаем камеру перед удалением компонента
onBeforeUnmount(() => {
  stopCamera()
})
</script>

<style scoped>
/* Добавьте стили по необходимости */
</style>
