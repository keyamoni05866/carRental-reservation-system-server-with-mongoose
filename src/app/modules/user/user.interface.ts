import { Model } from "mongoose";

export type TUser = {
  name: string;
  email: string;
  role: "user" | "admin";
  password: string;
  phone: string;
  address: string;
};

// export interface UserModel extends Model<TUser> {
//   isPasswordMatched(
//     plainTextPassword: string,
//     hashedPassword: string
//   ): Promise<boolean>;
// }
