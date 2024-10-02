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
  const carStatus = await Car.findByIdAndUpdate(
    carId,
    {
      $set: {
        status: "unavailable",
      },
    },
    { new: true, runValidators: true }
  );
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

// delete Or Cancel  User booking ---from user side
const cancelBookingOrDeleteBooking = async (id: string) => {
  const booking = await Booking.findById({ _id: id });
  // console.log(booking?.carId);
  const carId = booking?.carId;
  const carStatus = await Car.findByIdAndUpdate(
    carId,
    {
      $set: {
        status: "available",
      },
    },
    { new: true, runValidators: true }
  );
  await carStatus?.save();
  const result = await Booking.findByIdAndDelete({ _id: id });
  return result;
};

// cancel A Booking From Admin side
const cancelABookingFromAdminSideDB = async (id: string) => {
  const booking = await Booking.findById({ _id: id });
  // console.log(booking?.carId);
  const carId = booking?.carId;
  const carStatus = await Car.findByIdAndUpdate(
    carId,
    {
      $set: {
        status: "available",
      },
    },
    { new: true, runValidators: true }
  );
  await carStatus?.save();
  // console.log(carStatus);

  const result = Booking.findByIdAndUpdate(
    { _id: id },
    { isBooked: "unconfirmed", status: "cancelled" },
    { new: true }
  );
  return result;
};

// approve bookings
const approveBookingsFromDB = async (id: string) => {
  const result = Booking.findByIdAndUpdate(id, {
    isBooked: "confirmed",
    status: "confirmed",
  });
  return result;
};

// booking confirmed Cars

const getAllConfirmBookingFromDB = async () => {
  const result = await Booking.find({ isBooked: "confirmed" })
    .populate("user")
    .populate("carId");
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookedFromDB,
  getUserBooking,
  cancelBookingOrDeleteBooking,
  cancelABookingFromAdminSideDB,
  approveBookingsFromDB,
  getAllConfirmBookingFromDB,
};
