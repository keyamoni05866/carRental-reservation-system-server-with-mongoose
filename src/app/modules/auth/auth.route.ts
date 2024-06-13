import express from "express";
import { AuthControllers } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import userValidations from "../user/user.validation";
import signInValidation from "./auth.validation";
const router = express.Router();

router.post(
  "/signup",
  validateRequest(userValidations),
  AuthControllers.signup
);
router.post(
  "/signin",
  validateRequest(signInValidation),
  AuthControllers.signin
);

export const AuthRoutes = router;
