<script setup lang="ts">
import { $t, updatePreset, updateSurfacePalette } from '@primevue/themes'
import Aura from '@primevue/themes/aura'
import Lara from '@primevue/themes/lara'
import { onMounted, ref } from 'vue'
import SelectButton from 'primevue/selectbutton'
import { ILayoutColor, useLayoutStore } from '@/stores/useLayoutStore.js'
import { primaryColors } from '@/const/primaryColors.ts'
import { surfaces } from '@/const/surfaces.ts'

const layoutStore = useLayoutStore()

const presets = {
  Aura,
  Lara,
}
//const preset = ref(layoutConfig.value.preset)
const preset = layoutStore.layoutConfig.preset
const presetOptions = ref(Object.keys(presets))

//const menuMode = ref(layoutConfig.value.menuMode)
const menuMode = layoutStore.layoutConfig.menuMode
const menuModeOptions = ref([
  { label: 'Static', value: 'static' },
  { label: 'Overlay', value: 'overlay' },
])

function updateColors(type: string, color: ILayoutColor) {
  if (type === 'primary') {
    layoutStore.layoutConfig.primary = color.name
  } else if (type === 'surface') {
    layoutStore.layoutConfig.surface = color.name
  }

  applyTheme(type, color)
}

function applyTheme(type: string, color: ILayoutColor) {
  if (type === 'primary') {
    updatePreset(layoutStore.getPresetExt)
  } else if (type === 'surface') {
    updateSurfacePalette(color.palette)
  }
}

function onPresetChange() {
  layoutStore.layoutConfig.preset = preset
  const presetValue = presets[preset]
  console.log('onPresetChange', presetValue)
  const surfacePalette = surfaces.value.find((s) => s.name === layoutStore.layoutConfig.surface)?.palette

  $t()
    .preset(presetValue)
    .preset(layoutStore.getPresetExt)
    .surfacePalette(surfacePalette)
    .use({ useDefaultOptions: true })
}

function onMenuModeChange() {
  console.log('onMenuModeChange')
  //setMenuMode(menuMode.value)
  layoutStore.layoutConfig.menuMode = menuMode
}

onMounted(() => {
  if (layoutStore.layoutConfig.darkTheme) {
    document.documentElement.classList.toggle('app-dark')
  }
})
</script>

<template>
  <div
    class="config-panel hidden absolute top-[3.25rem] right-0 w-64 p-4 bg-surface-0 dark:bg-surface-900 border border-surface rounded-border origin-top shadow-[0px_3px_5px_rgba(0,0,0,0.02),0px_0px_2px_rgba(0,0,0,0.05),0px_1px_4px_rgba(0,0,0,0.08)]"
  >
    <div class="flex flex-col gap-4">
      <div>
        <span class="text-sm text-muted-color font-semibold">Primary</span>
        <div class="pt-2 flex gap-2 flex-wrap justify-between">
          <button
            v-for="primaryColor of primaryColors"
            :key="primaryColor.name"
            type="button"
            :title="primaryColor.name"
            @click="updateColors('primary', primaryColor)"
            :class="[
              'border-none w-5 h-5 rounded-full p-0 cursor-pointer outline-none outline-offset-1',
              { 'outline-primary': layoutStore.layoutConfig.primary === primaryColor.name },
            ]"
            :style="{
              backgroundColor: `${primaryColor.name === 'noir' ? 'var(--text-color)' : primaryColor.palette['500']}`,
            }"
          ></button>
        </div>
      </div>
      <div>
        <span class="text-sm text-muted-color font-semibold">Surface</span>
        <div class="pt-2 flex gap-2 flex-wrap justify-between">
          <button
            v-for="surface of surfaces"
            :key="surface.name"
            type="button"
            :title="surface.name"
            @click="updateColors('surface', surface)"
            :class="[
              'border-none w-5 h-5 rounded-full p-0 cursor-pointer outline-none outline-offset-1',
              {
                'outline-primary': layoutStore.layoutConfig.surface
                  ? layoutStore.layoutConfig.surface === surface.name
                  : layoutStore.layoutConfig.darkTheme
                    ? surface.name === 'zinc'
                    : surface.name === 'slate',
              },
            ]"
            :style="{ backgroundColor: `${surface.palette['500']}` }"
          ></button>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <span class="text-sm text-muted-color font-semibold">Presets</span>
        <SelectButton
          v-model="preset"
          @change="onPresetChange"
          :options="presetOptions"
          :allowEmpty="false"
        />
      </div>
      <div class="flex flex-col gap-2">
        <span class="text-sm text-muted-color font-semibold">Menu Mode</span>
        <SelectButton
          v-model="layoutStore.layoutConfig.menuMode"
          @change="onMenuModeChange"
          :options="menuModeOptions"
          :allowEmpty="false"
          optionLabel="label"
          optionValue="value"
        />
      </div>
    </div>
  </div>
</template>
