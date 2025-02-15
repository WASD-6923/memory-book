<script lang="ts" setup>
import { useTitle } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useRouteParams } from '@vueuse/router'
import { ApplicationSample, useApplicationSampleQuery } from '@/generated/graphqlOperations.js'
import router from '@/router/index.js'
import { useI18n } from 'vue-i18n'
import ApplicationSampleForm from '@/views/dictionaries/applicationSamples/partials/ApplicationSampleForm.vue'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import TabList from 'primevue/tablist'
import Tabs from 'primevue/tabs'
import Tab from 'primevue/tab'
import ApplicationSampleDocumentsPanel from '@/views/dictionaries/applicationSamples/partials/ApplicationSampleDocumentsPanel.vue'

const { t, locale } = useI18n()
console.log(locale.value)
useTitle(t('realty.update'))
const modelId = useRouteParams('id')

const { result, loading } = useApplicationSampleQuery({ id: modelId.value as string }, { fetchPolicy: 'no-cache' })

const model = computed<ApplicationSample>(() => result.value?.applicationSample)
const tabValue = ref('0')
</script>

<template>
  <Card>
    <template #title>
      <div class="flex flex-row align-items-center">
        <Button
          icon="pi pi-arrow-left"
          severity="primary"
          size="small"
          @click="router.go(-1)"
        />
        <div class="ml-2">
          <span
            >{{ t('applicationSample.update') }} <small>#{{ model?.name }}</small></span
          >
        </div>
      </div>
    </template>
    <template #content>
      <Tabs
        v-model:value="tabValue"
        v-if="!loading"
      >
        <TabList>
          <Tab value="0">{{ t('applicationSample.panel.main') }}</Tab>
          <Tab value="1">{{ t('applicationSample.panel.sample') }}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <ApplicationSampleForm
              v-if="!loading"
              :value="model"
              :id="modelId as string"
              mode="update"
            />
          </TabPanel>
          <TabPanel value="1">
            <ApplicationSampleDocumentsPanel
              v-if="!loading"
              :id="modelId as string"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </template>
  </Card>
</template>

<style scoped></style>
