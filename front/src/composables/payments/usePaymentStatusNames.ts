import { IEnumObject } from '@/types/IEnumObject.ts'

export const usePaymentStatusNames: IEnumObject[] = [
  {
    label: 'В ожидании',
    value: 'PENDING',
    severity: 'info',
  },
  {
    label: 'Успех',
    value: 'SUCCESS',
    severity: 'success',
  },
  {
    label: 'Ошибка',
    value: 'FAIL',
    severity: 'danger',
  },
]

export function getPaymentStatusObject(status: string): IEnumObject {
  return usePaymentStatusNames.find((item) => item.value === status) || { label: '', value: '', severity: '' }
}
