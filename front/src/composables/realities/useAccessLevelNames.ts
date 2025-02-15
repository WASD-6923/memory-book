import { AccessLevel } from '@/generated/graphqlOperations.js'
import { IEnumObject } from '@/types/IEnumObject.ts'
export const useAccessLevelNames: IEnumObject[] = [
  {
    label: 'realty.accessLevels.public',
    value: AccessLevel.Public,
    severity: 'success',
  },
  {
    label: 'realty.accessLevels.private',
    value: AccessLevel.Private,
    severity: 'info',
  },
  {
    label: 'realty.accessLevels.extended',
    value: AccessLevel.Extended,
    severity: 'secondary',
  },
  {
    label: 'realty.accessLevels.bidder',
    value: AccessLevel.Bidder,
    severity: 'secondary',
  },
  {
    label: 'realty.accessLevels.admin',
    value: AccessLevel.Admin,
    severity: 'secondary',
  },
]
