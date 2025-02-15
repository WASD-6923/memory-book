export const useFormatMoney = (value: number) => {
  if (!value) return 0
  const val = value.toFixed(0)
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
