import { AuctionStatus } from '@/generated/graphqlOperations.js'
import { IEnumObject } from '@/types/IEnumObject.ts'
export const useAuctionStatusesNames: IEnumObject[] = [
  {
    label: 'auction.statuses.waitForStart',
    value: AuctionStatus.WaitForStart,
    severity: 'secondary',
  },
  {
    label: 'auction.statuses.process',
    value: AuctionStatus.Process,
    severity: 'info',
  },
  {
    label: 'auction.statuses.success',
    value: AuctionStatus.Success,
    severity: 'success',
  },
  {
    label: 'auction.statuses.cancel',
    value: AuctionStatus.Cancel,
    severity: 'warn',
  },
]
