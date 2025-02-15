import { defineStore } from 'pinia'
import apolloClient from '@/plugins/ApolloClient.ts'
import {
  AuthMethod,
  MeQuery,
  QueryLoginArgs,
  Role,
  useLoginLazyQuery,
  useLogoutQuery,
  useMeQuery,
  User,
  useRefreshTokenLazyQuery,
} from '@/generated/graphqlOperations.ts'
import { provideApolloClient } from '@vue/apollo-composable'
import { useLocalStorage } from '@vueuse/core'
import router from '@/router/index.ts'
import { ApolloError, ApolloQueryResult } from '@apollo/client'
import { useNotificationsStore } from '@/stores/useNotificationsStore.js'

const user = JSON.parse(localStorage.getItem('user') || '{}')

type TimerHandle = ReturnType<typeof setTimeout>

interface UserState {
  user: User | undefined
  isLoggedIn: boolean
  accessToken: string | undefined
  refreshTask?: TimerHandle
  intendedRoute: string | null
}

const token = localStorage.getItem('accessToken') || undefined

export const useUserStore = defineStore('app/user', {
  state: (): UserState => ({
    user: user,
    isLoggedIn: !!token,
    accessToken: token,
    refreshTask: undefined,
    intendedRoute: null,
  }),
  getters: {
    isAdmin: (state) => {
      return state.user?.roles?.map((r: Role) => r.name).includes('admin')
    },
    isChairPerson: (state) => {
      return state.user?.roles?.map((r: Role) => r.name).includes('chairperson')
    },

    avatarImage: () => {
      return '/demo/images/avatar/empty.png'
    },
  },
  actions: {
    can(requiredPermission: string | undefined): boolean {
      if (!requiredPermission) return false
      if (this.isAdmin) return true
      if (this.user) {
        return this.user.roles?.some((role) =>
          // Для каждой роли проверяем наличие разрешения в ее `permissions`
          role.permissions?.some((permission) => permission?.name === requiredPermission),
        )
      }
      return false
    },
    async login(loginInput: QueryLoginArgs) {
      const { load } = provideApolloClient(apolloClient)(() =>
        useLoginLazyQuery(loginInput, { fetchPolicy: 'no-cache' }),
      )
      console.log('login', loginInput)

      /*const loadResult = load()

      if (loadResult instanceof Promise) {
        return loadResult.then(async (result) => {
          console.log('result', result)
          if (result && result.login?.accessToken) {
            localStorage.setItem('accessToken', result.login.accessToken)
            this.isLoggedIn = true
            await this.me()
            this.autoRefresh()
            return true
          }
          return false
        })
      }

      // Если load вернул false
      return false*/

      const result = await load()
      console.log('result', result)
      if (result && result.login?.accessToken) {
        localStorage.setItem('accessToken', result.login.accessToken)
        this.isLoggedIn = true
        await this.me()
        this.autoRefresh()
        return true
      }
      return false
    },
    autoRefresh() {
      // Апдейт токена каждые 20 минут
      const timeUntilRefresh = 10 * 60 * 1000
      this.refreshTask = setTimeout(() => this.refreshToken(), timeUntilRefresh)
      console.log('refreshTask', this.refreshTask)
    },
    async loginWithAuthToken(token: string, authMethod: AuthMethod) {
      localStorage.setItem('accessToken', token)
      this.isLoggedIn = true
      await this.me()
      this.autoRefresh()
      if (authMethod === AuthMethod.Register) {
        await router.push('/user/profile')
      } else {
        if (this.intendedRoute) {
          const intendedRoute = this.intendedRoute
          //console.log(intendedRoute)
          await router.push(intendedRoute)
          //this.intendedRoute = null
        } else if (this.isAdmin) {
          await router.push('/admin/dashboard')
        } else {
          await router.push('/')
        }
      }
    },
    async me() {
      const { onResult, onError } = provideApolloClient(apolloClient)(() => useMeQuery({ fetchPolicy: 'no-cache' }))
      onResult((result: ApolloQueryResult<MeQuery>) => {
        if (result.data) {
          this.user = result.data.me as User
          useLocalStorage('user', this.user)
        }
      })
      onError((error: ApolloError) => {
        console.log(error)
        localStorage.removeItem('user')
        localStorage.removeItem('accessToken')
        this.user = {} as User
        this.isLoggedIn = false
        router.push({ name: 'home' })
      })
    },
    async refreshToken() {
      const { load } = provideApolloClient(apolloClient)(() => useRefreshTokenLazyQuery({ fetchPolicy: 'no-cache' }))
      const result = await load()
      if (result) {
        const accessToken = (await result).refreshToken?.accessToken
        localStorage.setItem('accessToken', accessToken as string)
        this.autoRefresh()
      }
    },
    async logout() {
      const { onResult } = provideApolloClient(apolloClient)(() => useLogoutQuery())
      onResult(() => {
        window.clearTimeout(this.refreshTask)
        localStorage.removeItem('user')
        localStorage.removeItem('accessToken')
        const notifyStore = useNotificationsStore()
        notifyStore.$reset()
        this.user = {} as User
        this.isLoggedIn = false
        console.log('push root')
        router.push({ name: 'root' })
      })
    },
  },
})
