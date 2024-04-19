declare interface role {
  _id: string;
  name: string;
  code: string;
  active: boolean;
  permission: [];
}

declare interface user {
  [prop: string]: string;
  roles: role[];
}
