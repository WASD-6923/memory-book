import { defineStore } from 'pinia'

interface IErrorState {
  message: string | null
  category: string | null
  fields: Record<string, string> | null
}

export const useErrorsStore = defineStore('errors', {
  state: (): IErrorState => ({
    message: null,
    category: null,
    fields: null,
  }),
  getters: {
    getErrorFields(state) {
      return state
    },
    getErrorByField(state) {
      return (fieldName: string) => {
        if (state.fields && fieldName in state.fields) return state.fields[fieldName][0]
        return false
      }
    },
  },
  actions: {
    clearStore() {
      this.fields = null
    },
  },
})
