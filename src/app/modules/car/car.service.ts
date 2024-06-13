import AppError from "../../errors/AppError";
import { TCar } from "./car.interface";
import { Car } from "./car.model";

//creating car into db
const createCarIntoDB = async (payload: TCar) => {
  const result = await Car.create(payload);
  return result;
};

//getting all car from db
const getAllCarFromDB = async () => {
  const result = await Car.find();
  return result;
};

//get single car from db

const getSingleCarFromDB = async (id: string) => {
  //this is for not showing deleted car(soft Delete)
  const deletedCarData = await Car.findById(id);
  if (deletedCarData?.isDeleted == true) {
    throw new AppError(401, "This Car is deleted");
  }
  //show if car is not deleted
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

//delete a car from db soft delete

const deleteACar = async (id: string) => {
  const result = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true }
  );
  return result;
};

export const CarServices = {
  createCarIntoDB,
  getAllCarFromDB,
  getSingleCarFromDB,
  updateACarFromDB,
  deleteACar,
};
