import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { computed, ref } from 'vue'
import { primaryColors } from '@/const/primaryColors.ts'
import { surfaces } from '@/const/surfaces.ts'
import { updatePreset, updateSurfacePalette } from '@primevue/themes'

interface ILayoutConfig {
  preset: string
  primary: string
  surface: string | null
  darkTheme: boolean
  menuMode: string
  staticMenuDesktopInactive: boolean
  overlayMenuActive: boolean
  profileSidebarVisible: boolean
  configSidebarVisible: boolean
  staticMenuMobileActive: boolean
  menuHoverActive: boolean
  activeMenuItem: string | null
}

interface ILayoutState {
  layoutConfig: ILayoutConfig
}

const layoutConfig = useLocalStorage<ILayoutConfig>('layoutConfig', {
  preset: 'Aura',
  primary: 'sky',
  surface: null,
  darkTheme: false,
  menuMode: 'static',

  staticMenuDesktopInactive: false,
  overlayMenuActive: false,
  profileSidebarVisible: false,
  configSidebarVisible: false,
  staticMenuMobileActive: false,
  menuHoverActive: false,
  activeMenuItem: null,
})
export interface ILayoutColor {
  name: string
  palette: Record<string, string>
}


export const useLayoutStore = defineStore('app/layout', {
  state: (): ILayoutState => ({
    layoutConfig: layoutConfig.value,
  }),
  getters: {
    isSidebarActive: (state) =>
      computed(() => state.layoutConfig.overlayMenuActive || state.layoutConfig.staticMenuMobileActive),
    getPresetExt: (state) => {
      const color = primaryColors.value.find((c) => c.name === state.layoutConfig.primary)

      if (color?.name === 'noir') {
        return {
          semantic: {
            primary: {
              50: '{surface.50}',
              100: '{surface.100}',
              200: '{surface.200}',
              300: '{surface.300}',
              400: '{surface.400}',
              500: '{surface.500}',
              600: '{surface.600}',
              700: '{surface.700}',
              800: '{surface.800}',
              900: '{surface.900}',
              950: '{surface.950}',
            },
            colorScheme: {
              light: {
                primary: {
                  color: '{primary.950}',
                  contrastColor: '#ffffff',
                  hoverColor: '{primary.800}',
                  activeColor: '{primary.700}',
                },
                highlight: {
                  background: '{primary.950}',
                  focusBackground: '{primary.700}',
                  color: '#ffffff',
                  focusColor: '#ffffff',
                },
              },
              dark: {
                primary: {
                  color: '{primary.50}',
                  contrastColor: '{primary.950}',
                  hoverColor: '{primary.200}',
                  activeColor: '{primary.300}',
                },
                highlight: {
                  background: '{primary.50}',
                  focusBackground: '{primary.300}',
                  color: '{primary.950}',
                  focusColor: '{primary.950}',
                },
              },
            },
          },
        }
      } else {
        return {
          semantic: {
            primary: color?.palette,
            colorScheme: {
              light: {
                primary: {
                  color: '{primary.500}',
                  contrastColor: '#ffffff',
                  hoverColor: '{primary.600}',
                  activeColor: '{primary.700}',
                },
                highlight: {
                  background: '{primary.50}',
                  focusBackground: '{primary.100}',
                  color: '{primary.700}',
                  focusColor: '{primary.800}',
                },
              },
              dark: {
                primary: {
                  color: '{primary.400}',
                  contrastColor: '{surface.900}',
                  hoverColor: '{primary.300}',
                  activeColor: '{primary.200}',
                },
                highlight: {
                  background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
                  focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
                  color: 'rgba(255,255,255,.87)',
                  focusColor: 'rgba(255,255,255,.87)',
                },
              },
            },
          },
        }
      }
    },
  },
  actions: {
    menuToggle() {
      if (this.layoutConfig.menuMode === 'overlay') {
        this.layoutConfig.overlayMenuActive = !this.layoutConfig.overlayMenuActive
      }

      if (window.innerWidth > 991) {
        this.layoutConfig.staticMenuDesktopInactive = !this.layoutConfig.staticMenuDesktopInactive
      } else {
        this.layoutConfig.staticMenuMobileActive = !this.layoutConfig.staticMenuMobileActive
      }
    },
    updateColors() {
      //applyTheme(type, color)
    },
    toggleDarkMode() {
      if (!document.startViewTransition) {
        this.executeDarkModeToggle()
        return
      }
      document.startViewTransition(() => this.executeDarkModeToggle())
    },
    executeDarkModeToggle() {
      layoutConfig.value.darkTheme = !layoutConfig.value.darkTheme
      document.documentElement.classList.toggle('app-dark')
    },
    applyTheme() {
      updatePreset(this.getPresetExt)
      //updateSurfacePalette(color.palette)
    },
    resetMenu() {
      layoutConfig.value.overlayMenuActive = false
      layoutConfig.value.staticMenuMobileActive = false
      layoutConfig.value.menuHoverActive = false
    },
  },
})
