import { PaymentSystem } from '@/generated/graphqlOperations.js'
import { IEnumObject } from '@/types/IEnumObject.ts'

export const usePaymentSystemNames: IEnumObject[] = [
  {
    label: 'Stripe',
    value: PaymentSystem.Stripe,
    severity: 'success',
  },
  {
    label: 'Cloud payments',
    value: PaymentSystem.CloudPayment,
    severity: 'info',
  },
  {
    label: 'Точка банк',
    value: PaymentSystem.TochkaBank,
    severity: 'warn',
  },
  {
    label: 'Ю-Касса',
    value: PaymentSystem.YouKassa,
    severity: 'success',
  },
]

export function getPaymentSystemObject(paymentSystem: PaymentSystem): IEnumObject {
  return usePaymentSystemNames.find((item) => item.value === paymentSystem) || { label: '', value: '', severity: '' }
}
