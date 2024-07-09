import { JwtPayload } from "jsonwebtoken";

import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { User } from "../user/user.model";
import { Car } from "../car/car.model";

const createBookingIntoDB = async (
  payload: TBooking,
  authorizedUser: JwtPayload
) => {
  const email = authorizedUser.email;
  //   console.log(userEmail);
  const user = await User.findOne({ email });
  const { carId } = payload;
  const carStatus = await Car.findByIdAndUpdate(carId, {
    $set: {
      status: "unavailable",
    },
  });
  await carStatus?.save();

  const result = (
    await (
      await Booking.create({ ...payload, user: user?._id })
    ).populate("user")
  ).populate("carId");

  return result;
};

//get all booked

const getAllBookedFromDB = async () => {
  const result = await Booking.find().populate("user").populate("carId");
  return result;
};

//get user's booking
const getUserBooking = async (authorizedUser: JwtPayload) => {
  const email = authorizedUser.email;

  const user = await User.findOne({ email });
  const result = await Booking.find({ user })
    .populate("user")
    .populate("carId");
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookedFromDB,
  getUserBooking,
};
