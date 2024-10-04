import AppError from "../../errors/AppError";
// import { TReturn } from "../booking/booking.interface";
// import { Booking } from "../booking/booking.model";
import { TCar, TCarQuery, TCarQueryForBookingPage } from "./car.interface";
import { Car } from "./car.model";

//creating car into db
const createCarIntoDB = async (payload: TCar) => {
  const result = await Car.create(payload);
  return result;
};

//getting all car from db
const getAllCarFromDB = async (allQuery: TCarQuery) => {
  const { carType, color, features, priceRange, sortByPrice } = allQuery;

  const query: any = {};
  // filter by carType
  if (carType && carType !== "All") {
    query.carType = carType;
  }
  // filter by carType
  if (color && color !== "All") {
    query.color = color;
  }
  // filter by carType
  if (features && features !== "All") {
    query.features = features;
  }
  if (priceRange !== undefined) {
    query.pricePerHour = {};

    if (priceRange !== undefined) query.pricePerHour.$lte = priceRange;
  }
  // const sort: any = sortByOrder === "asc" ? { price: 1 } : { price: -1 };
  const sort: any =
    sortByPrice === "asc" ? { pricePerHour: 1 } : { pricePerHour: -1 };
  const result = await Car.find(query).sort(sort);
  return result;
};
const getAllAvailableCarForBookingFromDB = async (
  allQuery: TCarQueryForBookingPage
) => {
  const { carType, name, features } = allQuery;

  const query: any = {};

  if (name) {
    query.$or = [{ name: { $regex: name, $options: "i" } }];
  }

  if (carType && carType !== "All") {
    query.carType = carType;
  }

  // filter by carType
  if (features && features !== "All") {
    query.features = features;
  }
  const availableCars = { ...query, status: "available" };
  const result = await Car.find(availableCars);

  return result;
};

const getFeaturedCars = async () => {
  const result = Car.find({ isFeatured: true });
  return result;
};

//get single car from db

const getSingleCarFromDB = async (id: string) => {
  const result = await Car.findById(id);
  return result;
};

//update a car from DB
const updateACarFromDB = async (id: string, payload: Partial<TCar>) => {
  const result = await Car.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

//delete a car from db

const deleteACar = async (id: string) => {
  const result = await Car.findByIdAndDelete(id);
  return result;
};

export const CarServices = {
  createCarIntoDB,
  getAllCarFromDB,
  getFeaturedCars,
  getAllAvailableCarForBookingFromDB,
  getSingleCarFromDB,
  updateACarFromDB,
  deleteACar,
};
