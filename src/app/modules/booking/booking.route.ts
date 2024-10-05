import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { bookingValidations } from "./booking.validation";
import { BookingControllers } from "./booking.controller";
import auth from "../../middlewares/auth";
import { USER_Role } from "../user/user.constant";

const router = express.Router();

router.post(
  "/",

  validateRequest(bookingValidations.bookingValidationSchema),
  auth(USER_Role.user),
  BookingControllers.createBooking
);

router.get("/", auth(USER_Role.admin), BookingControllers.getAllBooking);
router.get(
  "/my-bookings",
  auth(USER_Role.user),
  BookingControllers.getUserBooking
);
router.get(
  "/my-bookings-afterReturn",
  auth(USER_Role.user),
  BookingControllers.getUserCarReturnedBooking
);

// confirm booking cars
router.get(
  "/confirm-bookings",
  auth(USER_Role.admin),
  BookingControllers.getAllConfirmBooking
);

router.put("/return", auth(USER_Role.admin), BookingControllers.returnCar);

router.patch(
  "/approve-booking/:id",
  auth(USER_Role.admin),
  BookingControllers.approveBooking
);

router.delete("/:id", auth(USER_Role.user), BookingControllers.cancelBooking);
router.delete(
  "/cancel-booking/:id",
  auth(USER_Role.admin),
  BookingControllers.cancelBookingFromAdminSide
);

router.post("/payment", BookingControllers.paymentUpdated);

export const BookingRoutes = router;
