import { defineStore } from 'pinia'
import { RemovableRef, useStorage } from '@vueuse/core'
import { StateAuth } from '@/types/StateAuth.ts'
import { provideApolloClient } from '@vue/apollo-composable'
import apolloClient from '@/plugins/ApolloClient.ts'
import {
  AuthMethod,
  AuthProvider,
  useAuthCodeByPhoneQuery,
  useLoginWithKeyAndCodeQuery,
} from '@/generated/graphqlOperations.ts'
import { useUserStore } from '@/stores/useUserStore.ts'

interface LoginState {
  stateAuth: StateAuth
  existPhone: RemovableRef<string | null>
  countryCode: RemovableRef<string | null>
  phone: string | null
  code: string | null
  provider: AuthProvider | null
  error: boolean
  errorMessage: string | null
  loading: boolean
  key: string | null
}

export const useLoginStore = defineStore('login/store', {
  state: (): LoginState => ({
    stateAuth: 'EnterPhone',
    existPhone: useStorage<string | null>('phone', null),
    phone: null,
    code: null,
    provider: AuthProvider.Smsup,
    error: false,
    errorMessage: null,
    loading: false,
    countryCode: useStorage<string | null>('countryCode', null),
    key: null,
  }),
  getters: {},
  actions: {
    clearPhone() {
      // existPhone.value = null
      this.existPhone = null
    },
    async getCodeByPhone() {
      if (!this.phone || this.phone?.trim() === '') return
      this.loading = true
      this.error = false
      this.errorMessage = null
      const { onResult } = provideApolloClient(apolloClient)(() =>
        useAuthCodeByPhoneQuery(
          {
            input: {
              phone: this.phone,
              countryCode: this.countryCode,
            },
          },
          { fetchPolicy: 'no-cache' },
        ),
      )
      onResult((result) => {
        this.loading = false
        if (result.data.authCodeByPhone) {
          console.log(result.data)
          if (result.data.authCodeByPhone.error) {
            this.error = result.data.authCodeByPhone.error
            this.errorMessage = result.data.authCodeByPhone.errorMessage as string
            return
          } else {
            this.stateAuth = 'EnterCode'
          }
        }
      })
    },
    async loginWithCodeAndPhone() {
      this.loading = true
      this.error = false
      this.errorMessage = null
      const { onResult } = provideApolloClient(apolloClient)(() =>
        useLoginWithKeyAndCodeQuery(
          {
            input: {
              key: this.key,
              provider: this.provider,
              code: this.code,
            },
          },
          { fetchPolicy: 'no-cache' },
        ),
      )
      onResult(async (result) => {
        this.loading = false
        if (result.data.loginWithKeyAndCode) {
          if (result.data.loginWithKeyAndCode.error) {
            this.error = result.data.loginWithKeyAndCode.error
            this.errorMessage = result.data.loginWithKeyAndCode.errorMessage as string
            this.code = null
          } else {
            const userStore = useUserStore()
            this.code = null
            localStorage.setItem('phone', this.phone as string)
            this.existPhone = this.phone as string
            await userStore.loginWithAuthToken(
              result.data.loginWithKeyAndCode.accessToken as string,
              result.data.loginWithKeyAndCode.authMethod as AuthMethod,
            )
          }
        }
      })
    },
  },
})
