import { defineStore } from 'pinia'

interface State {
  sidebarUnfoldable: boolean
  sidebarVisible: boolean
}

export const useAppTemplateStore = defineStore('app/template', {
  state: (): State => ({
    sidebarUnfoldable: false,
    sidebarVisible: true,
  }),
  actions: {
    toggleUnfoldable() {
      this.sidebarUnfoldable = !this.sidebarUnfoldable
    },
  },
})
