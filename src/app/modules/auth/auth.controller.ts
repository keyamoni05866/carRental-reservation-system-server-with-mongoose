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

export const AuthControllers = {
  signup,
};
