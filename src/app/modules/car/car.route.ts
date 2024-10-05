import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { carValidations } from "./car.validation";
import { CarControllers } from "./car.controller";
import auth from "../../middlewares/auth";
import { USER_Role } from "../user/user.constant";
const router = express.Router();

//creating Car Route
router.post(
  "/create-car",
  validateRequest(carValidations.createCarValidation),
  auth(USER_Role.admin),

  CarControllers.createCar
);

//get all car route
router.get("/", CarControllers.getAllCar);
router.get("/featuredCars", CarControllers.getFeaturedCar);
router.get(
  "/availableCarsForBooking",
  CarControllers.getAllAvailableCarForBooking
);
//get single get car route
router.get("/:id", CarControllers.getSingleCar);

//update car by id route
router.patch(
  "/update-car/:id",
  validateRequest(carValidations.updateCarValidation),
  auth(USER_Role.admin),
  CarControllers.updateACar
);
//soft delete car route
router.delete("/:id", auth(USER_Role.admin), CarControllers.deleteCar);

export const CarRoutes = router;
