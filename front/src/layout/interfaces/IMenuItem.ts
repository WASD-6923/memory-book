export interface IMenuItem {
  label?: string
  icon?: string
  to?: string
  permission?: string
  items?: IMenuItem[]
  visible?: boolean
  url?: string
  class?: string
  target?: string
  separator?: boolean
}
