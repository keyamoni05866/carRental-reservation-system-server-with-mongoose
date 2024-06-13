import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { carValidations } from "./car.validation";
import { CarControllers } from "./car.controller";
const router = express.Router();

//creating Car Route
router.post(
  "/",
  validateRequest(carValidations.createCarValidation),
  CarControllers.createCar
);
//get all car route
router.get("/", CarControllers.getAllCar);
//get single get car route
router.get("/:id", CarControllers.getSingleCar);
//update car by id route
router.put("/:id", CarControllers.updateACar);
//soft delete car route
router.delete("/:id", CarControllers.deleteCar);

export const CarRoutes = router;
