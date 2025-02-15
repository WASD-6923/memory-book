import { LegalStatus } from '@/generated/graphqlOperations.js'
import { IEnumObject } from '@/types/IEnumObject.ts'
export const useRealtyLegalStatusNames: IEnumObject[] = [
  {
    label: 'realty.legalStatuses.free',
    value: LegalStatus.Free,
    severity: 'success',
  },
  {
    label: 'realty.legalStatuses.published',
    value: LegalStatus.Published,
    severity: 'info',
  },
  {
    label: 'realty.legalStatuses.archive',
    value: LegalStatus.Archive,
    severity: 'secondary',
  },
]
