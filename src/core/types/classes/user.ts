export class User {
  uid: string;
  username: string;
  vip: string;
  type: string;
  cratetime: string;
  ext: {
    projects: number;
  };
}

export interface UserInfo {
  username: number;
  vip: number;
  ext: {
    projects: number;
  };
}