import express from "express";
import { paymentController } from "./payment.controller";
import auth from "../../middlewares/auth";
import { USER_Role } from "../user/user.constant";

const router = express.Router();

//creating Car Route
router.post(
  "/confirmation",
  auth(USER_Role.user),
  paymentController.paymentConfirmation
);

export const PaymentRoutes = router;
