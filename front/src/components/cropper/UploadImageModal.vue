<script lang="ts" setup>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import { computed, onMounted, reactive, ref } from 'vue'
import {
  DocumentCreateMutationVariables,
  useDocumentCreateMutation,
  useDocumentDeleteMutation,
  useDocumentLazyQuery,
} from '@/generated/graphqlOperations.js'
import { useToast } from 'primevue/usetoast'
import {useI18n} from "vue-i18n";
import { useUserStore } from '@/stores/useUserStore.ts'

const userStore = useUserStore()
const { t } = useI18n()
const toast = useToast()
const visible = ref(false)
const uploadedImage = ref(null)
const localError = ref(null)
const dragEnter = ref(null)
const imageCropper = ref(null)

const cropperFileUploadImage = ref<HTMLInputElement>()

const emit = defineEmits(['update-image'])
const props = defineProps({
  hint: {
    type: String,
  },
  error: {
    type: String,
    default: null,
  },
  documentableId: {
    type: String,
    required: true,
  },
  documentableType: {
    type: String,
    required: true,
  },
  documentType: {
    type: Number,
    required: true,
  },
  imageId: {
    type: String,
    required: false,
  },
})

const computedError = computed(() => false)

const { load } = useDocumentLazyQuery({ id: props.imageId })

onMounted(async () => {
  if (props.imageId) {
    const result = await load()
    if (result) {
      console.log(result)
    }
  }
})

const handleSelectImage = () => {
  const crop = document.getElementById('cropper-file-uploads')
  if (crop) {
    crop.click()
  }
}

const variables = reactive<DocumentCreateMutationVariables>({
  input: {
    name: '',
    documentable_id: '',
    documentable_type: '',
    type: 0,
    file: undefined,
  },
})

const {
  mutate: mutateCreate,
  onDone: onDoneCreate,
  onError: onErrorCreate,
} = useDocumentCreateMutation({ variables: variables })
onDoneCreate((result) => {
  if (result.data) {
    toast.add({
      severity: 'success',
      summary: t('common.success'),
      detail: t('uploadImageModal.fileUploadedSuccess'),
      life: 3000,
    })
    console.log(result)
    userStore.me()
    emit('update-image', result.data?.documentCreate)
    // eslint-disable-next-line vue/no-mutating-props
    //props.items?.push(result.data.documentCreate)
    visible.value = false
  }
})

onErrorCreate(() => {
  toast.add({
    severity: 'error',
    summary: 'Ошибка',
    detail: 'Ошибка сохранения файла',
    life: 3000,
  })
})

const { mutate: mutateDelete, onDone: onDoneDelete } = useDocumentDeleteMutation()
onDoneDelete(() => {
  toast.add({
    severity: 'success',
    summary: 'Успех',
    detail: 'Файл успешно удален',
    life: 3000,
  })
})

const handleSave = async () => {
  const { canvas } = imageCropper.value.getResult()
  if (canvas) {
    console.log('handlerSave')
    console.log(canvas)
    //const form = new FormData()
    canvas.toBlob(async (blob) => {
      variables.input = {
        name: newFile.value ? newFile.value.name : 'image.jpg',
        documentable_id: props.documentableId,
        documentable_type: props.documentableType,
        type: 0,
        file: blob,
      }
      await mutateCreate(variables)
    }, 'image/jpeg')
  }
}

const newFile = ref()
const selectImg = (e) => {
  const [file] = e.target.files || []
  newFile.value = file
  console.log(newFile.value)
  uploadImg(file)
}

const uploadImg = (file) => {
  localError.value = null
  if (!file) return
  if (file.size >= 50 * 1000 * 1000) {
    handleClearCrop()
    return (localError.value = 'Файл не должен превышать 50мб')
  }
  uploadedImage.value = URL.createObjectURL(file)
}

const handleDragover = (e) => {
  e.preventDefault()
}
const handleDrop = (e) => {
  e.preventDefault()
  for (let i = 0; i < e.dataTransfer.items.length; i++) {
    if (e.dataTransfer.items[i].kind === 'file') {
      const file = e.dataTransfer.items[i].getAsFile()
      uploadImg(file)
    }
  }
  handleToggleDragEnter(false)
}
const handleToggleDragEnter = (state) => {
  dragEnter.value = state
}
const handleClearCrop = () => {
  uploadedImage.value = null
  // @ts-ignore
  //document.getElementById('cropper-file-uploads').value = null
  cropperFileUploadImage.value = null
  //this.$refs.cropper?.clearCrop()
}
const handleRotate = (angle: number) => {
  imageCropper.value.rotate(angle)
}

const handleFlip = (x: boolean, y: boolean) => {
  imageCropper.value.flip(x, y)
}

const handleChangeCrop = (e) => {
  console.log('handleChangeCrop')
  console.log(e)
}
const handleDragEnd = (e) => {
  console.log('handleChangeCrop')
  console.log(e)
}
</script>

<template>
  <Button
    icon="pi pi-cloud-upload"
    :label="t('uploadImageModal.load')"
    size="small"
    @click="visible = true"
  ></Button>
  <Dialog
    v-model:visible="visible"
    :style="{ width: '40vw' }"
    :header="t('uploadImageModal.header')"
    modal
  >
    <template #header>
      <div
        v-if="uploadedImage"
        class="flex flex-row justify-content-end align-content-center"
      >
        <Button
          v-tooltip="t('uploadImageModal.turnLeft')"
          aria-label="RotateLeft"
          icon="pi pi-bookmark"
          raised
          rounded
          severity="secondary"
          text
          @click="handleRotate(-90)"
        >
          <svg
            fill="none"
            height="16"
            style="fill: currentColor"
            viewBox="0 0 16 16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              clip-path="url(#clip0_40_639)"
              opacity="0.75"
            >
              <path
                d="M0.666608 7.33333C0.843419 7.33333 1.01299 7.40357 1.13801 7.5286C1.26304 7.65362 1.33327 7.82319 1.33327 8C1.32786 9.55018 1.861 11.0541 2.84159 12.2548C3.82218 13.4554 5.18932 14.2782 6.70935 14.5825C8.22937 14.8869 9.80791 14.6538 11.1752 13.9232C12.5424 13.1927 13.6134 12.0099 14.2053 10.5771C14.7971 9.14433 14.8729 7.55049 14.4197 6.06801C13.9666 4.58552 13.0126 3.30644 11.7209 2.44938C10.4292 1.59232 8.87989 1.2105 7.33784 1.36918C5.7958 1.52786 4.35673 2.21718 3.26661 3.31933C3.28853 3.32531 3.31079 3.32999 3.33327 3.33333H5.33327C5.51008 3.33333 5.67965 3.40357 5.80468 3.5286C5.9297 3.65362 5.99994 3.82319 5.99994 4C5.99994 4.17681 5.9297 4.34638 5.80468 4.47141C5.67965 4.59643 5.51008 4.66667 5.33327 4.66667H3.33327C2.80284 4.66667 2.29413 4.45595 1.91906 4.08088C1.54399 3.70581 1.33327 3.1971 1.33327 2.66667V0.666667C1.33327 0.489856 1.40351 0.320286 1.52854 0.195262C1.65356 0.0702379 1.82313 0 1.99994 0C2.17675 0 2.34632 0.0702379 2.47135 0.195262C2.59637 0.320286 2.66661 0.489856 2.66661 0.666667V2.04333C4.03157 0.82302 5.77399 0.108111 7.60271 0.0180684C9.43142 -0.0719742 11.2356 0.468305 12.7139 1.54862C14.1921 2.62894 15.2549 4.18386 15.7245 5.95354C16.1941 7.72322 16.0421 9.60046 15.294 11.2716C14.5459 12.9427 13.2469 14.3064 11.6142 15.1349C9.9814 15.9634 8.11377 16.2065 6.32334 15.8235C4.53292 15.4405 2.92817 14.4547 1.77724 13.0307C0.626314 11.6067 -0.0010643 9.83093 -5.91278e-05 8C-5.91278e-05 7.82319 0.070179 7.65362 0.195203 7.5286C0.320227 7.40357 0.489797 7.33333 0.666608 7.33333Z"
                fill="currentColor"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_40_639">
                <rect
                  fill="white"
                  height="16"
                  transform="matrix(-1 0 0 1 16 0)"
                  width="16"
                ></rect>
              </clipPath>
            </defs>
          </svg>
        </Button>
        <Button
          v-tooltip="t('uploadImageModal.turnRight')"
          aria-label="RotateRight"
          class="ml-2"
          icon="pi pi-bookmark"
          raised
          rounded
          severity="secondary"
          text
          @click="handleRotate(90)"
        >
          <svg
            fill="none"
            height="16"
            style="fill: currentColor"
            viewBox="0 0 16 16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              clip-path="url(#clip0_40_636)"
              opacity="0.75"
            >
              <path
                d="M15.3334 7.33333C15.1566 7.33333 14.987 7.40357 14.862 7.5286C14.737 7.65362 14.6667 7.82319 14.6667 8C14.6721 9.55018 14.139 11.0541 13.1584 12.2548C12.1778 13.4554 10.8107 14.2782 9.29065 14.5825C7.77063 14.8869 6.19209 14.6538 4.82485 13.9232C3.45761 13.1927 2.38655 12.0099 1.79475 10.5771C1.20294 9.14433 1.12713 7.55049 1.58027 6.06801C2.03341 4.58552 2.98737 3.30644 4.27909 2.44938C5.57081 1.59232 7.12011 1.2105 8.66216 1.36918C10.2042 1.52786 11.6433 2.21718 12.7334 3.31933C12.7115 3.32531 12.6892 3.32999 12.6667 3.33333H10.6667C10.4899 3.33333 10.3203 3.40357 10.1953 3.5286C10.0703 3.65362 10.0001 3.82319 10.0001 4C10.0001 4.17681 10.0703 4.34638 10.1953 4.47141C10.3203 4.59643 10.4899 4.66667 10.6667 4.66667H12.6667C13.1972 4.66667 13.7059 4.45595 14.0809 4.08088C14.456 3.70581 14.6667 3.1971 14.6667 2.66667V0.666667C14.6667 0.489856 14.5965 0.320286 14.4715 0.195262C14.3464 0.0702379 14.1769 0 14.0001 0C13.8232 0 13.6537 0.0702379 13.5287 0.195262C13.4036 0.320286 13.3334 0.489856 13.3334 0.666667V2.04333C11.9684 0.82302 10.226 0.108111 8.39729 0.0180684C6.56858 -0.0719742 4.76436 0.468305 3.28611 1.54862C1.80787 2.62894 0.745149 4.18386 0.275543 5.95354C-0.194063 7.72322 -0.0421112 9.60046 0.706008 11.2716C1.45413 12.9427 2.75309 14.3064 4.38585 15.1349C6.0186 15.9634 7.88623 16.2065 9.67666 15.8235C11.4671 15.4405 13.0718 14.4547 14.2228 13.0307C15.3737 11.6067 16.0011 9.83093 16.0001 8C16.0001 7.82319 15.9298 7.65362 15.8048 7.5286C15.6798 7.40357 15.5102 7.33333 15.3334 7.33333Z"
                fill="currentColor"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_40_636">
                <rect
                  fill="white"
                  height="16"
                  width="16"
                ></rect>
              </clipPath>
            </defs>
          </svg>
        </Button>
        <Button
          v-tooltip="t('uploadImageModal.flipHorizontal')"
          aria-label="FlipH"
          icon="pi pi-arrows-h"
          class="ml-2"
          raised
          rounded
          severity="secondary"
          text
          @click="handleFlip(true, false)"
        />
        <Button
          v-tooltip="t('uploadImageModal.flipVertical')"
          aria-label="FlipV"
          icon="pi pi-arrows-v"
          class="ml-2"
          raised
          rounded
          severity="secondary"
          text
          @click="handleFlip(false, true)"
        />
        <Button
          v-tooltip="t('uploadImageModal.delete')"
          aria-label="Trash"
          class="ml-2"
          icon="pi pi-trash"
          raised
          rounded
          severity="warning"
          text
          @click="handleClearCrop"
        />
        <Button
          v-tooltip="t('uploadImageModal.saveAndClose')"
          aria-label="Save"
          class="ml-2"
          icon="pi pi-save"
          raised
          rounded
          severity="info"
          text
          @click="handleSave"
        />
      </div>
    </template>
    <input
      id="cropper-file-uploads"
      ref="cropperFileUploadImage"
      accept="image/png, image/jpeg, image/jpg, .svg"
      style="position: absolute; clip: rect(0 0 0 0)"
      type="file"
      @change="selectImg($event)"
    />
    <!-- пустое состояние -->
    <div
      v-if="!uploadedImage"
      class="el-cropper__empty"
      draggable="true"
      @dragenter="() => handleToggleDragEnter(true)"
      @dragleave="() => handleToggleDragEnter(false)"
      @dragover="handleDragover"
      @drop="handleDrop"
    >
      <i
        class="pi pi-cloud-upload"
        style="font-size: 2rem"
      />

      <div class="mb-4">{{ t('uploadImageModal.dropText') }}</div>
      <Button
        class="mt-4"
        @click="handleSelectImage"
        >{{ t('uploadImageModal.selectImage') }}
      </Button>

      <!-- Блок во время перетаскивания файла -->
      <div class="el-cropper__empty-blur">
        <!--        <el-text size="14" max-width="75%" align="center" color="blue">-->
        {{ t('uploadImageModal.dropLoadText') }}
        <!--        </el-text>-->
      </div>
    </div>

    <!-- состояние когда загружено изображение -->
    <div
      v-else
      class="el-cropper__area"
    >
      <cropper
        ref="imageCropper"
        :src="uploadedImage"
        :stencil-props="{
          aspectRatio: 10 / 10,
        }"
        class="cropper"
        @change="handleChangeCrop"
        @dragend="handleDragEnd"
      />
    </div>

    <!-- Ошибки и подсказка -->
    <div v-if="!uploadedImage">
      <small
        v-if="hint && !computedError"
        class="el-cropper__hint"
        >{{ hint }}</small
      >
      <small
        v-if="computedError"
        class="el-cropper__error"
        >{{ computedError }}</small
      >
    </div>
  </Dialog>
</template>

<style lang="scss" scoped>
.el-cropper {
  $block-name: &;
  //@include child-indent-bottom($space-24);
  &.error {
    #{$block-name}__empty {
      border-radius: 3px;
      border-color: red;
    }
  }

  &.drag-enter {
    #{$block-name}__empty {
      border-radius: 3px;
      border-color: blue;

      &-blur {
        z-index: 1;
      }

      * {
        user-select: none;
        pointer-events: none;
      }
    }
  }

  &__area {
    .vue-cropper {
      min-height: 300px;
    }
  }

  &__empty {
    position: relative;
    // @include child-indent-bottom($space-20);
    min-height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px dashed lightslategray;
    border-radius: 4px;
    padding: 32px;

    &-blur {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -111;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(#ffffff, 0.75);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }

    &-upload-button {
      margin-bottom: 0;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    //@include child-indent-right($space-10);
    .save-btn {
      margin-left: auto;
    }
  }

  &__error,
  &__hint {
    display: block;
    max-width: 100%;
    animation: slideDown 0.3s forwards;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: red;
    font-size: 12px;
  }

  &__hint {
    color: gray;

    &.red {
      color: red;
    }
  }

  #cropper-file-uploads-el {
    margin: 0;
  }
}
</style>
