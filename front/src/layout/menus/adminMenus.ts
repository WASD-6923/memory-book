import { IMenuItem } from '@/layout/interfaces/IMenuItem.ts'

const adminMenus: IMenuItem[] = [
  {
    label: 'sideMenu.main',
    items: [
      {
        label: 'sideMenu.dashboard',
        icon: 'pi pi-fw pi-home',
        to: '/admin/dashboard',
        permission: 'menuDashboard',
      },
    ],
  },
  {
    label: 'sideMenu.systemMenu',
    items: [
      {
        label: 'sideMenu.peoples',
        icon: 'pi pi-fw pi-users',
        to: '/admin/peoples',
        permission: 'menuAdminPeoples',
      },
      {
        label: 'sideMenu.municipals',
        icon: 'pi pi-fw pi-building',
        to: '/admin/municipals',
        permission: 'menuAdminMunicipals',
      },
      {
        label: 'sideMenu.users',
        icon: 'pi pi-fw pi-users',
        to: '/admin/users',
        permission: 'menuAdminUsers',
      },
      {
        label: 'sideMenu.userProfiles',
        icon: 'pi pi-fw pi-id-card',
        to: '/admin/profiles',
        permission: 'menuAdminProfiles',
      },
      {
        label: 'sideMenu.roles',
        icon: 'pi pi-fw pi-crown',
        to: '/admin/roles',
        permission: 'menuAdminRoles',
      },
    ],
  },
]

export default adminMenus
