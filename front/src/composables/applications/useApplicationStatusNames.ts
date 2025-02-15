import { ApplicationStatus } from '@/generated/graphqlOperations.js'
import { IEnumObject } from '@/types/IEnumObject.ts'

export const useApplicationStatusNames: IEnumObject[] = [
  {
    label: 'application.statuses.draft',
    value: ApplicationStatus.Draft,
    severity: 'info',
  },
  {
    label: 'application.statuses.onWork',
    value: ApplicationStatus.OnWork,
    severity: 'warn',
  },
  {
    label: 'application.statuses.onRework',
    value: ApplicationStatus.OnRework,
    severity: 'warn',
  },
  {
    label: 'application.statuses.approved',
    value: ApplicationStatus.Approved,
    severity: 'success',
  },
  {
    label: 'application.statuses.approved',
    value: ApplicationStatus.Rejected,
    severity: 'success',
  },
]
