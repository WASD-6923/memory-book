import { UserStatus } from '@/generated/graphqlOperations.js'
import { IEnumObject } from '@/types/IEnumObject.ts'

export const useUserStatusNames: IEnumObject[] = [
  {
    label: 'user.statuses.active',
    value: UserStatus.Active,
    severity: 'success',
  },
  {
    label: 'user.statuses.banned',
    value: UserStatus.Banned,
    severity: 'info',
  },
  {
    label: 'user.statuses.toDelete',
    value: UserStatus.ToDelete,
    severity: 'warn',
  },
  {
    label: 'user.statuses.deleted',
    value: UserStatus.Deleted,
    severity: 'danger',
  },
]

export function getUserStatusObject(status: UserStatus): IEnumObject {
  return useUserStatusNames.find((item) => item.value === status) || { label: '', value: '', severity: '' }
}
