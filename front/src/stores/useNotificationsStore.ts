import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Pusher from 'pusher-js'
import LaravelEcho from 'laravel-echo'
import { useUserStore } from '@/stores/useUserStore.js'
import {
  Notification,
  useMarkAllAsReadMutation,
  useMarkAsReadMutation,
  useNotificationsLazyQuery,
} from '@/generated/graphqlOperations.js'
import { provideApolloClient } from '@vue/apollo-composable'
import apolloClient from '@/plugins/ApolloClient.js'

export const useNotificationsStore = defineStore('notifications', () => {
  const authUserStore = useUserStore()
  const notifications = ref<Notification[]>([])

  const echoOptions: any = {
    key: import.meta.env.VITE_REVERB_APP_ID,
    broadcaster: 'reverb',
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    authEndpoint: import.meta.env.VITE_APP_BASE + '/broadcasting/auth',
    auth: {
      headers: {
        Authorization: `Bearer ${authUserStore.accessToken}`,
      },
    },
  }

  if (import.meta.env.VITE_REVERB_HOST === 'localhost' || import.meta.env.VITE_REVERB_HOST === '127.0.0.1') {
    echoOptions.wsPort = import.meta.env.VITE_REVERB_PORT
    echoOptions.forceTLS = false
  } else {
    echoOptions.wsPath = '/ws'
    echoOptions.forceTLS = true
  }
  const echo = ref(
    new LaravelEcho({
      ...echoOptions,
      client: new Pusher(import.meta.env.VITE_REVERB_APP_KEY, echoOptions),
    }),
  )

  echo.value.private(`App.Models.User.User.${authUserStore.user.id}`).notification((notification: Notification) => {
    addNotification(notification)
  })

  const echoState = ref(echo)

  const leaveAll = () => {
    echo.value.leaveAllChannels()
  }

  if (authUserStore.user.id !== undefined) {
    loadNotifications().then()
  }

  const unreadMessages = computed(() => notifications.value.filter((n) => n.read_at === null).length)

  function addNotification(notification: Notification) {
    notifications.value = [...notifications.value, notification]
  }

  async function loadNotifications() {
    const { load } = provideApolloClient(apolloClient)(() =>
      useNotificationsLazyQuery({
        first: 999,
        page: 1,
        filter: {
          unRead: true,
          userId: authUserStore.user.id,
        },
      }),
    )
    const result = await load()
    if (result) {
      notifications.value = result.notifications.data
    }
  }

  async function markAsRead(id: string) {
    const { mutate } = provideApolloClient(apolloClient)(() =>
      useMarkAsReadMutation({
        variables: { id: id },
      }),
    )
    const result = await mutate()
    if (result) {
      notifications.value = notifications.value.map((n) => (n.id === id ? { ...n, read_at: 'yes' } : n))
    }
  }

  async function markAllAsRead() {
    const { mutate } = provideApolloClient(apolloClient)(() => useMarkAllAsReadMutation())
    const result = await mutate()
    if (result) {
      notifications.value = notifications.value.map((n) => ({ ...n, read_at: 'yes' }))
    }
  }

  function $reset() {
    notifications.value = []
  }

  return {
    state: notifications,
    echo,
    unreadMessages,
    echoState,
    markAsRead,
    markAllAsRead,
    leaveAll,
    $reset,
  }
})
