import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { onError } from '@apollo/client/link/error'
import { useErrorsStore } from '@/stores/useErrors.ts'
import { setContext } from '@apollo/client/link/context'
import router from '@/router/index.ts'
import createUploadLink from '@/components/apollo-upload/createUploadLink'
import { useUserStore } from '@/stores/useUserStore.js'

const uploadLink = createUploadLink({
  uri: import.meta.env.VITE_APP_BASE_GRAPHQL + '/graphql',
})

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors)
    useErrorsStore().$state = {
      message: graphQLErrors[0].message as string,
      category: graphQLErrors[0]?.extensions?.category as string,
      fields: (graphQLErrors[0]?.extensions?.validation as Record<string, string>) ?? null,
    }
  if (!graphQLErrors || graphQLErrors[0]?.message === 'Unauthenticated.') {
    const userStorage = useUserStore()
    console.log('clear storage')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    userStorage.user = undefined
    router.push({ name: 'root' })
  }
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('accessToken')
  const locale = localStorage.getItem('user-locale') ?? import.meta.env.VITE_DEFAULT_LOCALE
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      'Accept-Language': locale,
      'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  }
})

const apolloClient = new ApolloClient({
  link: errorLink.concat(authLink).concat(uploadLink),
  cache: new InMemoryCache(),
})

export default apolloClient
