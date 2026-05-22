export interface IAuth {
  fullName: string;
  email: string;
  password: string;
  role: string;
  phoneNo?: string;
  isVerified: boolean;
}
export enum AuthRoles {
  Admin = "admin",
  User = "user",
}
