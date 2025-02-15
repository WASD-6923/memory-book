<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import moment from 'moment'
import { useNotificationsStore } from '@/stores/useNotificationsStore.js'
import { Notification } from '@/generated/graphqlOperations.ts'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const notifyStore = useNotificationsStore()
const op = ref()

const toggle = (event: Event) => {
  op.value.toggle(event)
}

const handleClick = (item: Notification) => {
  op.value.toggle()
  notifyStore.markAsRead(item.id)
  router.push(item.data?.url as string)
}
const formattedDateTime = (date: string) => {
  return moment(date).format('DD.MM.YYYY HH:mm')
}
const handleAll = (e: Event) => {
  op.value.toggle(e)
  router.push('/user/notifications')
}
</script>
<template>
  <button
    type="button"
    class="layout-topbar-action"
    @click="toggle"
  >
    <i class="pi pi-bell">
      <Badge
        v-if="notifyStore.unreadMessages > 0"
        :value="notifyStore.unreadMessages"
        severity="danger"
        style="position: relative; top: -15px"
      ></Badge>
    </i>
  </button>
  <Popover ref="op">
    <div class="flex flex-col gap-4 w-[20rem]">
      <div v-if="notifyStore.unreadMessages == 0">
        <div class="text-gray-600">{{ t('notification.noNewMessages') }}</div>
      </div>
      <ul
        v-else
        class="p-0 mx-0 mt-0 mb-0 list-none"
      >
        <li
          v-for="(item, index) in notifyStore.state"
          v-bind:key="index"
          class="align-items-center py-2 border-bottom-1 surface-border"
          style="border-bottom-color: #00a4c6 !important"
        >
          <div class="text-gray-500 mb-2 text-sm">
            {{ formattedDateTime(item.created_at) }}
          </div>
          <!--          <div class="mb-2" style="color: #00a4c6">Уведомление портала</div>-->
          <span
            :class="{ 'notify-not-read': item.read_at === null }"
            style="cursor: pointer; font-size: 12px"
            @click="handleClick(item)"
          >
            {{ t(item.data?.message as string) }}
          </span>
        </li>

        <li class="text-center pt-3 max-w-full">
          <Button
            :label="t('notification.allMessages')"
            size="small"
            style="width: 100%; background-color: #00a4c6; border-color: #00a4c6"
            @click="handleAll"
          />
        </li>
      </ul>
    </div>
  </Popover>
</template>
<style scoped>
.notify-not-read {
  font-weight: 700;
}
</style>
