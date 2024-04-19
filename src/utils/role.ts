export class Role {
  roles: string[];
  constructor() {
    this.roles = [];
  }
  // 判断角色
  checkRoles(role: string[]): boolean {
    return role.some((item) => this.roles.includes(item));
  }
  // 获取角色
  getRoles(roles: role[]) {
    roles.forEach((role) => {
      this.roles.push(role.code);
    });
    return this;
  }
}
