import config from "../../config";
import { catchAsync } from "../utils/catchAsync";
import { AuthServices } from "./auth.service";

const signup = catchAsync(async (req, res) => {
  const result = await AuthServices.signup(req.body);

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "User registered successfully",
    data: result,
  });
});

const signin = catchAsync(async (req, res) => {
  const result = await AuthServices.signin(req.body);
  const { user, token, refreshToken } = result;
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
  });
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User logged in successfully",
    data: user,
    token,
  });
});
export const AuthControllers = {
  signup,
  signin,
};
