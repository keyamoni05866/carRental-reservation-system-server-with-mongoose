import express from "express";
import { AuthControllers } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import userValidations from "../user/user.validation";
const router = express.Router();

router.post(
  "/signup",
  validateRequest(userValidations),
  AuthControllers.signup
);

export const AuthRoutes = router;
