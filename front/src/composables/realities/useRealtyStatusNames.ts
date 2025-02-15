import { RealtyStatus } from '@/generated/graphqlOperations.js'
import { IEnumObject } from '@/types/IEnumObject.ts'

export const useRealtyStatusNames: IEnumObject[] = [
  {
    label: 'realty.statuses.draft',
    value: RealtyStatus.Draft,
    severity: 'info',
  },
  {
    label: 'realty.statuses.published',
    value: RealtyStatus.Published,
    severity: 'success',
  },
  {
    label: 'realty.statuses.archive',
    value: RealtyStatus.Archive,
    severity: 'secondary',
  },
]
