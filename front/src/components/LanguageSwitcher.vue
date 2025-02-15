<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Trans from '@/i18n/Translation.js'
import { computed } from 'vue'
const { t, locale } = useI18n()

const items = computed(() => [
  {
    label: t('locale.es'),
    locale: 'es',
    icon: 'pi pi-external-link',
    command: () => {
      Trans.switchLanguage('es')
    },
  },
  {
    label: t('locale.en'),
    locale: 'en',
    icon: 'pi pi-external-link',
    command: () => {
      Trans.switchLanguage('en')
    },
  },
  {
    label: t('locale.ru'),
    locale: 'ru',
    icon: 'pi pi-refresh',
    command: () => {
      Trans.switchLanguage('ru')
    },
  },
])

const flag = (locale: string) => (locale === 'en' ? 'us' : locale)
</script>

<template>
  <SplitButton
    :model="items"
    severity="secondary"
    size="small"
  >
    <template #item="slotProps">
      <div class="flex flex-row my-0 p-2 align-items-center justify-content-center">
        <img
          alt="flag"
          src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
          :class="
            'mt-1 flex align-items-center justify-content-center cursor-pointer flag flag-' +
            flag(slotProps.item.locale)
          "
          style="width: 24px; height: 16px"
        />
        <div class="ml-2 cursor-pointer">
          {{ slotProps.item.label }}
        </div>
      </div>
    </template>
    <span class="flex items-center font-bold">
      <img
        alt="flag"
        src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
        :class="'flag flag-' + flag(locale)"
        style="width: 20px"
      />
    </span>
  </SplitButton>
</template>

<style scoped></style>
