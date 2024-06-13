import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { carValidations } from "./car.validation";
import { CarControllers } from "./car.controller";
const router = express.Router();

router.post(
  "/",
  validateRequest(carValidations.createCarValidation),
  CarControllers.createCar
);
router.get("/", CarControllers.getAllCar);
router.get("/:id", CarControllers.getSingleCar);
router.put("/:id", CarControllers.updateACar);
router.delete("/:id", CarControllers.deleteCar);

export const CarRoutes = router;
