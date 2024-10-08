import { catchAsync } from "../../utils/catchAsync";
import { CarServices } from "./car.service";

//Creating A Car
const createCar = catchAsync(async (req, res) => {
  const result = await CarServices.createCarIntoDB(req.body);

  if (result) {
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Car created successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: true,
      statusCode: 404,
      message: "No Data Found",
      data: [],
    });
  }
});

//get All Car
const getAllCar = catchAsync(async (req, res) => {
  const { carType, color, priceRange, features, sortByPrice } = req.query;
  const result = await CarServices.getAllCarFromDB({
    carType: carType as string,
    priceRange: priceRange ? Number(priceRange) : undefined,
    color: color as string,
    features: features as string,
    sortByPrice: sortByPrice as "asc" | "desc",
  });
  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Cars retrieved successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: true,
      statusCode: 404,
      message: "No Data Found",
      data: [],
    });
  }
});
const getAllAvailableCarForBooking = catchAsync(async (req, res) => {
  const { name, carType, features } = req.query;
  const result = await CarServices.getAllAvailableCarForBookingFromDB({
    name: name as string,
    carType: carType as string,
    features: features as string,
  });
  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Cars retrieved successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: true,
      statusCode: 404,
      message: "No Data Found",
      data: [],
    });
  }
});

const getFeaturedCar = catchAsync(async (req, res) => {
  const result = await CarServices.getFeaturedCars();

  if (result) {
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Featured Cars Get successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: true,
      statusCode: 404,
      message: "No Data Found",
      data: [],
    });
  }
});

//Get a Single Car
const getSingleCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.getSingleCarFromDB(id);
  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "A Car retrieved successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: true,
      statusCode: 404,
      message: "No Data Found",
      data: [],
    });
  }
});

//update A Car

const updateACar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.updateACarFromDB(id, req.body);
  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Car updated successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: true,
      statusCode: 404,
      message: "No Data Found",
      data: [],
    });
  }
});

//delete a car

const deleteCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.deleteACar(id);
  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Car Deleted successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: true,
      statusCode: 404,
      message: "No Data Found",
      data: [],
    });
  }
});

export const CarControllers = {
  createCar,
  getAllCar,
  getFeaturedCar,
  getSingleCar,
  getAllAvailableCarForBooking,
  updateACar,
  deleteCar,
};
