const existsRoles = ['Администратор платформы']

export function useRoleNames(role: number): string {
  return existsRoles[role]
}
/*export function useRoleNames(roles: Array<number>): string {
  const rs: Array<string> = []
  if (roles) {
    roles.forEach(function (item) {
      rs.push(existsRoles[item])
    })
    return rs.join(', ')
  }

  return ''
}*/
