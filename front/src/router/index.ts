import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'
import { useUserStore } from '@/stores/useUserStore.js'
import PublicLayout from '@/layout/PublicLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: PublicLayout,
      redirect: '/home',
      name: 'root',
      children: [
        {
          path: 'home',
          name: 'HomeIndex',
          component: () => import('@/views/pages/home/HomeIndex.vue'),
          meta: {
            auth: false,
          },
        },
        {
          path: 'pages/contacts',
          name: 'contactsIndex',
          component: () => import('@/views/pages/contacts/ContactIndex.vue'),
          meta: {
            auth: false,
          },
        },
        {
          path: 'user',
          name: 'user',
          children: [
            {
              path: 'notifications',
              name: 'userNotifications',
              component: () => import('@/views/user/notification/NotificationIndex.vue'),
              meta: {
                auth: true,
                admin: false,
              },
            },
            {
              path: 'profile',
              name: 'userProfile',
              component: () => import('@/views/user/profile/UserProfile.vue'),
              meta: {
                auth: true,
                admin: false,
              },
            },
          ],
        },
      ],
    },
    {
      path: '/admin',
      component: AppLayout,
      redirect: '/admin/dashboard',
      name: 'adminIndex',
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
          meta: {
            auth: true,
            admin: true,
          },
        },
        {
          path: 'roles',
          name: 'adminRoles',
          component: () => import('@/views/admin/roles/RoleIndex.vue'),
          meta: {
            auth: true,
            admin: true,
          },
        },
        {
          path: 'roles/update/:id',
          name: 'adminRoleUpdate',
          component: () => import('@/views/admin/roles/RoleUpdate.vue'),
          meta: {
            auth: true,
            admin: true,
          },
        },
        {
          path: 'peoples',
          name: 'adminPeoples',
          component: () => import('@/views/admin/peoples/PeopleIndex.vue'),
          meta: {
            auth: true,
            admin: true,
          },
        },
        {
          path: 'peoples/update/:id',
          name: 'adminPeopleUpdate',
          component: () => import('@/views/admin/peoples/PeopleUpdate.vue'),
          meta: {
            auth: true,
            admin: true,
          },
        },
        {
          path: 'peoples/create',
          name: 'adminPeopleCreate',
          component: () => import('@/views/admin/peoples/PeopleCreate.vue'),
          meta: {
            auth: true,
            admin: true,
          },
        },

        {
          path: 'municipals',
          name: 'adminMunicipals',
          component: () => import('@/views/admin/municipal/MunicipalIndex.vue'),
          meta: {
            auth: true,
            admin: true,
          },
        },
        {
          path: 'municipals/update/:id',
          name: 'adminMunicipalUpdate',
          component: () => import('@/views/admin/municipal/MunicipalUpdate.vue'),
          meta: {
            auth: true,
            admin: true,
          },
        },
        {
          path: 'municipals/create',
          name: 'adminMunicipalCreate',
          component: () => import('@/views/admin/municipal/MunicipalCreate.vue'),
          meta: {
            auth: true,
            admin: true,
          },
        },

        {
          path: 'users',
          name: 'adminUsers',
          component: () => import('@/views/admin/users/UserIndex.vue'),
          meta: {
            auth: true,
            admin: true,
          },
        },
        {
          path: 'users/create',
          name: 'adminUserCreate',
          component: () => import('@/views/admin/users/UserCreate.vue'),
          meta: {
            auth: true,
            admin: true,
          },
        },
        {
          path: 'users/update/:id',
          name: 'adminUserUpdate',
          component: () => import('@/views/admin/users/UserUpdate.vue'),
          meta: {
            auth: true,
            admin: true,
          },
        },
        {
          path: 'users/view/:id',
          name: 'adminUserView',
          component: () => import('@/views/admin/users/UserView.vue'),
          meta: {
            auth: true,
            admin: true,
          },
        },
        {
          path: 'profiles',
          name: 'adminProfiles',
          component: () => import('@/views/admin/profiles/ProfileIndex.vue'),
          meta: {
            auth: true,
            admin: true,
          },
        },
        {
          path: 'profiles/update/:id',
          name: 'adminProfileUpdate',
          component: () => import('@/views/admin/profiles/ProfileUpdate.vue'),
          meta: {
            auth: true,
            admin: true,
          },
        },

        {
          path: 'permissions',
          name: 'adminPermissions',
          component: () => import('@/views/admin/permission/PermissionIndex.vue'),
          meta: {
            auth: true,
            admin: true,
          },
        },
        {
          path: 'profile',
          name: 'adminUserProfiles',
          component: () => import('@/views/admin/profiles/ProfileIndex.vue'),
          meta: {
            auth: true,
            admin: false,
          },
        },
      ],
    },
    {
      path: '/auth',
      name: 'auth',
      children: [
        /*{
          path: 'sign-in',
          name: 'signIn',
          component: () => import('@/views/auth/AuthView.vue'),
          meta: {
            auth: false,
          },
        },
        {
          path: 'sign-up',
          name: 'signUp',
          component: () => import('@/views/auth/AuthView.vue'),
          meta: {
            auth: false,
          },
        },*/
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/auth/LoginView.vue'),
          meta: {
            auth: false,
          },
        },
        {
          path: 'error',
          name: 'error',
          component: () => import('@/views/auth/Error.vue'),
          meta: {
            auth: false,
          },
        },
      ],
    },
  ],
})

router.beforeEach((to, _, next) => {
  const userStore = useUserStore()
  if (to.meta.auth === true) {
    if (userStore.isLoggedIn) {
      if (to.meta.admin === true && !userStore.can(to.name as string)) {
        console.log(to.name, 'no can')
        next({ name: 'root' })
      } else {
        next()
      }
    } else {
      userStore.intendedRoute = to.fullPath
      next({ name: 'login' })
    }
  }

  if (to.meta.auth === false) {
    next()
  }
})

export default router
