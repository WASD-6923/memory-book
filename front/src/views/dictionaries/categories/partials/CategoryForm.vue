<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  Category,
  CategoryInput,
  useCategoryCreateMutation,
  useCategoryUpdateMutation,
} from '@/generated/graphqlOperations.ts'
import { useRoute, useRouter } from 'vue-router'
import { useErrorsStore } from '@/stores/useErrors.ts'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import MainPanel from '@/views/dictionaries/categories/partials/MainPanel.vue'
import PropertiesPanel from '@/views/dictionaries/categories/partials/PropertiesPanel.vue'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const errStore = useErrorsStore()
const toast = useToast()
const tabValue = ref((route.query.tab as string) ?? '0')

const props = defineProps({
  id: {
    type: String,
    required: false,
    default: '',
  },
  mode: {
    type: String,
    required: false,
    default: 'update',
  },
})

const modelValue = defineModel<Category>()
const localModel = ref<Partial<CategoryInput>>()

onMounted(() => {
  if (props.mode === 'update') {
    localModel.value = {
      name: modelValue.value?.name,
      description: modelValue.value?.description,
      categoryProperties: modelValue.value?.categoryProperties,
    }
  } else {
    localModel.value = {
      name: undefined,
      description: undefined,
      categoryProperties: [],
    }
  }
})
const { mutate: createMutation, onDone: onDoneStore } = useCategoryCreateMutation()

onDoneStore((result) => {
  if (result.data) {
    errStore.$reset()
    toast.add({
      severity: 'success',
      summary: t('common.success'),
      detail: t('categories.createSuccess'),
      life: 3000,
    })
    console.log(result.data.categoryCreate?.id)
    //router.push({ to: `/dictionaries/categories/update/${result.data.categoryCreate?.id}`, query: { tab: '1' } })
    router.push({
      name: 'categoryUpdate',
      params: { id: result.data.categoryCreate?.id },
      query: { tab: '1' },
    })
  }
})

const { mutate: updateMutation, onDone: onDoneUpdate } = useCategoryUpdateMutation()
onDoneUpdate((result) => {
  if (result.data) {
    errStore.$reset()
    toast.add({
      severity: 'success',
      summary: t('common.success'),
      detail: t('categories.updateSuccess'),
      life: 3000,
    })
    router.push({
      name: 'categoryIndex',
    })
  }
})

const handleSave = () => {
  const input: CategoryInput = {
    name: localModel.value?.name,
    description: localModel.value?.description,
  }
  if (props.mode === 'create') {
    createMutation({
      input: input,
    })
  } else {
    updateMutation({
      id: props.id,
      input: input,
    })
  }
}
const handleCancel = () => {
  router.push({ name: 'categoryIndex' })
}

const handleChangeTabPanel = (val: string) => {
  router.push({ query: { tab: val } })
}
</script>

<template>
  <Fluid class="mt-4">
    <form @submit.prevent="handleSave">
      <div
        v-if="localModel"
        class="col-12"
      >
        <Tabs
          v-model:value="tabValue"
          @update:value="handleChangeTabPanel"
        >
          <TabList>
            <Tab value="0">{{ t('categories.general') }}</Tab>
            <Tab
              value="1"
              v-if="mode === 'update'"
              >{{ t('categories.properties') }}
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="0">
              <MainPanel v-model="localModel" />
            </TabPanel>
            <TabPanel value="1">
              <PropertiesPanel
                v-model="localModel"
                :category-id="id"
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <div class="flex flex-row-reverse mt-4">
          <Button
            class="ml-2"
            icon="pi pi-times"
            :label="t('common.cancel')"
            severity="secondary"
            size="small"
            @click="handleCancel"
          />
          <Button
            icon="pi pi-check"
            :label="t('common.save')"
            severity="success"
            size="small"
            @click="handleSave"
          />
        </div>
      </div>
    </form>
  </Fluid>
</template>

<style scoped></style>
