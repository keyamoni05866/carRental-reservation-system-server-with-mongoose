import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";

const signup = async (payload: TUser) => {
  //if user exists
  const user = await User.findOne({ email: payload.email }).select({
    password: 0,
  });
  if (user) {
    throw new AppError(400, "The User is already Exists.");
  }
  const result = await User.create(payload);
  return result;
};

export const AuthServices = {
  signup,
};
