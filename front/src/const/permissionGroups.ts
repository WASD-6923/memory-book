import { PermissionGroup } from '@/generated/graphqlOperations.js'

export const permissionGroups = [
  {
    value: PermissionGroup.Admin,
    label: 'Администрирование',
  },
  {
    value: PermissionGroup.Dictionary,
    label: 'Справочники',
  },
  {
    value: PermissionGroup.Menu,
    label: 'Меню',
  },
]

export const permissionGroupByValue = (value: string) => {
  return permissionGroups.find((option) => option.value === value)?.label
}
