<script lang="ts" setup>
import { PropType } from 'vue'
import { User } from '@/generated/graphqlOperations.js'
import { useFormatDate } from '@/composables/useFormatDate.js'
import CarLotSharedLinksPanel from '@/components/car/CarLotSharedLinksPanel.vue'
import TranslationsPanel from '@/components/car/TranslationsPanel.vue'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import UserPayments from '@/views/admin/users/partials/UserPayments.vue'
import UserPaymentHistory from '@/views/admin/users/partials/UserPaymentHistory.vue'
import UserBidNotifications from '@/views/admin/users/partials/UserBidNotifications.vue'
import UserFavorites from '@/views/admin/users/partials/UserFavorites.vue'

defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
})
</script>

<template>
  <div class="">
    <Tabs value="0">
      <TabList>
        <Tab value="0"><template #default> <i class="pi pi-home mr-1" /> Главное </template></Tab>
        <Tab value="1"><template #default> <i class="pi pi-language mr-1" /> Переводы </template></Tab>
        <Tab value="2"><template #default> <i class="pi pi-link mr-1" /> Шаринговые ссылки</template></Tab>
        <Tab value="3"><template #default> <i class="pi pi-wallet mr-1" /> Платежи</template></Tab>
        <Tab value="4"><template #default> <i class="pi pi-receipt mr-1" /> История платежей</template></Tab>
        <Tab value="5"><template #default> <i class="pi pi-bell mr-1" /> Уведомления о торгах</template></Tab>
        <Tab value="6"><template #default> <i class="pi pi-star mr-1" /> Избранное</template></Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <ul class="mb-4">
            <li><span class="font-bold">ID:</span> {{ user.id }}</li>
            <li><span class="font-bold">EMail:</span> {{ user.email }}</li>
            <li><span class="font-bold">Имя:</span> {{ user.name }}</li>
            <li><span class="font-bold">Телефон:</span> {{ user.phone }}</li>
            <li><span class="font-bold">Местоположение:</span> {{ user.location ?? 'неизвестно' }}</li>
            <li><span class="font-bold">Валюта:</span> {{ user.currency }}</li>
            <li><span class="font-bold">Телеграм:</span> {{ user.telegram_id }}</li>
            <li><span class="font-bold">Язык:</span> {{ user.lang }}</li>
            <li><span class="font-bold">Аккаунт создан:</span> {{ useFormatDate(user.created_at) }}</li>
            <li><span class="font-bold">Последний вход:</span> {{ useFormatDate(user.login_date_time) }}</li>

            <li><span class="font-bold">Тариф:</span> {{ user.profile.tariff?.name }}</li>
            <li>
              <span class="font-bold">Тариф закончится:</span> {{ useFormatDate(user.profile.tariff_expired_date) }}
            </li>
            <li><span class="font-bold">Баланс руб.:</span> {{ user.profile.balance_rub }}</li>
            <li><span class="font-bold">Баланс usd:</span> {{ user.profile.balance_usd }}</li>
            <li><span class="font-bold">осталось переводов:</span> {{ user.profile.remainder_count_translations }}</li>
            <li><span class="font-bold">Всего переводов:</span> {{ user.profile.total_translates }}</li>
          </ul>
        </TabPanel>
        <TabPanel value="1">
          <TranslationsPanel
            :show-title="false"
            :translations="user.translations"
          />
        </TabPanel>
        <TabPanel value="2">
          <CarLotSharedLinksPanel
            :show-title="false"
            :shared-links="user.carLotShareLinks"
          />
        </TabPanel>
        <TabPanel value="3">
          <UserPayments :wallet-deposits="user.walletDeposits" :show-title="false"  />
        </TabPanel>
        <TabPanel value="4">
          <UserPaymentHistory :user-purchases="user.userPurchases" />
        </TabPanel>
        <TabPanel value="5">
          <UserBidNotifications :bid-notifications="user.bidNotifications" />
        </TabPanel>
        <TabPanel value="6">
          <UserFavorites :favorites="user.favorites" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<style scoped></style>
