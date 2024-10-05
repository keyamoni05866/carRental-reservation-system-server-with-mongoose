import express from "express";
import { paymentController } from "./payment.controller";

const router = express.Router();

//creating Car Route
router.post("/confirmation", paymentController.paymentConfirmation);

export const PaymentRoutes = router;
