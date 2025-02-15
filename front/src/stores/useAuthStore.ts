import { defineStore } from 'pinia'
import { RemovableRef, useStorage } from '@vueuse/core'
import {
  AuthMethod,
  AuthProvider,
  AuthStage,
} from '@/generated/graphqlOperations.ts'
import { provideApolloClient } from '@vue/apollo-composable'
import apolloClient from '@/plugins/ApolloClient.ts'
import { useErrorsStore } from '@/stores/useErrors.ts'
import { ApolloQueryResult } from '@apollo/client'
import { useUserStore } from '@/stores/useUserStore.ts'
import LoginForm from '@/views/auth/partials/LoginForm.vue'
import EnterCode from '@/views/auth/partials/EnterCode.vue'
import { StateAuth } from '@/types/StateAuth.ts'
import RegisterForm from '@/views/auth/partials/RegisterForm.vue'
import { computed } from 'vue'

interface RegisterState {
  authState: StateAuth
  countryCode: RemovableRef<string | null>
  phone: string | null
  code: string | null
  email: string | null
  password: string | null
  provider: AuthProvider | null
  error: boolean
  errorMessage: string | null
  loading: boolean
  stage: AuthStage
  key: string | null
}

export const AuthComponents: Partial<Record<StateAuth, typeof LoginForm>> = {
  RegisterForm: RegisterForm,
  LoginForm: LoginForm,
  EnterCode: EnterCode,
} as const

export const useAuthStore = defineStore('app/auth', {
  state: (): RegisterState => ({
    authState: 'RegisterForm',
    phone: null,
    code: null,
    email: null,
    password: null,
    provider: AuthProvider.Smsup,
    error: false,
    errorMessage: null,
    loading: false,
    countryCode: useStorage<string | null>('countryCode', null),
    stage: AuthStage.Register,
    key: null,
  }),
  getters: {
    activeComponent: (state) => computed(() => AuthComponents[state.authState]),
  },
  actions: {
    async signUp() {
      const errorStore = useErrorsStore()
      this.loading = true
      this.error = false
      this.errorMessage = null
      /*const { onResult } = provideApolloClient(apolloClient)(() =>
        useSignUpQuery(
          {
            input: {
              email: this.email,
              password: this.password,
              phone: this.phone,
              countryCode: this.countryCode,
            },
          },
          { fetchPolicy: 'no-cache' },
        ),
      )
      onResult((result: ApolloQueryResult<SignUpQuery>) => {
        this.loading = false
        errorStore.$reset()
        if (result.data.signUp) {
          console.log(result.data)
          if (result.data.signUp.error) {
            this.error = result.data.signUp.error
            this.errorMessage = result.data.signUp.errorMessage as string
            return
          } else {
            this.stage = AuthStage.Register
            this.authState = 'EnterCode'
            this.key = result.data.signUp.key as string
            this.provider = result.data.signUp.provider as AuthProvider
          }
        }
      })*/
    },
    async signIn() {
      const errorStore = useErrorsStore()
      this.loading = true
      this.error = false
      this.errorMessage = null
      /*const { onResult } = provideApolloClient(apolloClient)(() =>
        useSignInQuery(
          {
            input: {
              email: this.email,
              password: this.password,
            },
          },
          { fetchPolicy: 'no-cache' },
        ),
      )
      onResult((result: ApolloQueryResult<SignInQuery>) => {
        this.loading = false
        errorStore.$reset()
        if (result.data.signIn) {
          console.log(result.data)
          if (result.data.signIn.error) {
            this.error = result.data.signIn.error
            this.errorMessage = result.data.signIn.errorMessage as string
            return
          } else {
            this.stage = AuthStage.Login
            this.authState = 'EnterCode'
            this.key = result.data.signIn.key as string
            this.phone = result.data.signIn.phone as string
            this.provider = result.data.signIn.provider as AuthProvider
          }
        }
      })*/
    },
    async loginWithCodeAndPhone() {
      this.loading = true
      this.error = false
      this.errorMessage = null
      /*const { onResult } = provideApolloClient(apolloClient)(() =>
        useLoginWithKeyAndCodeQuery(
          {
            input: {
              key: this.key,
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
            await userStore.loginWithAuthToken(
              result.data.loginWithKeyAndCode.accessToken as string,
              result.data.loginWithKeyAndCode.authMethod as AuthMethod,
            )
          }
        }
      })*/
    },
  },
})
