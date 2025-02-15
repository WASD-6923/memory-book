import { defineStore } from 'pinia'

interface State {
  locale: string
}

export const useLanguageStore = defineStore('app/template', {
  state: (): State => ({
    locale: import.meta.env.VITE_DEFAULT_LOCALE,
  }),
  actions: {
    toggleUnfoldable() {
      this.sidebarUnfoldable = !this.sidebarUnfoldable
    },
  },
})
