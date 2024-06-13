import { catchAsync } from "../utils/catchAsync";
import { CarServices } from "./car.service";

//Creating A Car
const createCar = catchAsync(async (req, res) => {
  const result = await CarServices.createCarIntoDB(req.body);

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "Car created successfully",
    data: result,
  });
});

//get All Car
const getAllCar = catchAsync(async (req, res) => {
  const result = await CarServices.getAllCarFromDB();
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Cars retrieved successfully",
    data: result,
  });
});

//Get a Single Car
const getSingleCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.getSingleCarFromDB(id);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "A Car retrieved successfully",
    data: result,
  });
});

//update A Car

const updateACar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.updateACarFromDB(id, req.body);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Car updated successfully",
    data: result,
  });
});

//delete a car

const deleteCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.deleteACar(id);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Car Deleted successfully",
    data: result,
  });
});

export const CarControllers = {
  createCar,
  getAllCar,
  getSingleCar,
  updateACar,
  deleteCar,
};
