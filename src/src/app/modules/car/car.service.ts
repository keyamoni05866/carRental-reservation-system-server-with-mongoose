import mongoose, { ObjectId } from "mongoose";
import AppError from "../../errors/AppError";
import { TReturn } from "../booking/booking.interface";
import { Booking } from "../booking/booking.model";
import { TCar } from "./car.interface";
import { Car } from "./car.model";
// import { convertTimeInDate } from "./car.util";

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

const returnTheCar = async (payload: TReturn) => {
  const { bookingId, endTime } = payload;
  const bookingInfo = await Booking.findById(bookingId);

  // console.log(bookingInfo?.carId);
  if (bookingInfo?._id != bookingId) {
    throw new AppError(400, "Booking  not found");
  }
  // const carId = bookingInfo?.carId;
  const carInfo = await Car.findById(bookingInfo.carId);
  const bookingEndTime = new Date(`1970-01-01T${bookingInfo?.endTime}`);
  const bookingStartTime = new Date(`1970-01-01T${bookingInfo?.startTime}`);
  const updateStatus = await Car.findByIdAndUpdate(carInfo?._id, {
    $set: {
      status: "available",
    },
  });
  await updateStatus?.save();

  const updateEndTime = await Booking.findByIdAndUpdate(bookingId, {
    endTime: endTime,
  });
  await updateEndTime?.save();
  const pricePerHour = carInfo?.pricePerHour;
  // console.log(pricePerHour);
  if (pricePerHour !== undefined) {
    const timeDurationInMinutes =
      bookingEndTime.getTime() - bookingStartTime.getTime();
    const timeDurationInHours = timeDurationInMinutes / (1000 * 60 * 60);

    const totalCost: number = timeDurationInHours * Number(pricePerHour);
    // console.log(totalCost);
    const ultimateResult = Number(totalCost);
    console.log(ultimateResult);
    const result = await Booking.findByIdAndUpdate(
      bookingId,

      { totalCost: totalCost },

      { new: true }
    );
    return result;
  }
};
export const CarServices = {
  createCarIntoDB,
  getAllCarFromDB,
  getSingleCarFromDB,
  updateACarFromDB,
  deleteACar,
  returnTheCar,
};
