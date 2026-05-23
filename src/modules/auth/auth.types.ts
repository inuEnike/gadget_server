export interface IAuth {
  fullName: string;
  email: string;
  password: string;
  role: string;
  phoneNo?: string;
  isVerified: boolean;
  OTP?: string | Buffer<ArrayBufferLike>;
}
export enum AuthRoles {
  Admin = "admin",
  User = "user",
}
