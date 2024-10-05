import { JwtPayload } from "jsonwebtoken";

import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { User } from "../user/user.model";
import { Car } from "../car/car.model";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { calculateTotalDurationOfTime } from "./booking.util";
import { initiatePayment } from "../payment/payment.util";

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
//get user's booking
const getUserReturnBooking = async (authorizedUser: JwtPayload) => {
  const email = authorizedUser.email;

  const user = await User.findOne({ email });
  const result = await Booking.find({ user, isReturned: true })
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

// Management Return A car
const returnCarFromDB = async (payload: Record<string, unknown>) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const { booking, endTime } = payload as {
      booking: any;
      endTime: string;
    };
    const bookingId = booking?._id;
    const getBooking = await Booking.findById({ _id: bookingId }).session(
      session
    );
    if (!getBooking) {
      throw new AppError(404, "Booking Not Found");
    }
    const startTime = getBooking.payment.startTime;
    const { carId } = getBooking;
    const startDateAndTime = new Date(startTime);
    const endDateAndTime = new Date(endTime);

    const getCar = await Car.findByIdAndUpdate(
      { _id: carId },
      { status: "available" },
      { new: true, runValidators: true, session }
    );

    if (!getCar) {
      throw new AppError(404, "Car Not Found");
    }

    const { pricePerHour } = getCar;
    const getTotalCost = calculateTotalDurationOfTime(
      startDateAndTime.toISOString(),
      endDateAndTime.toISOString(),
      pricePerHour
    );

    const updateIsReturn = await Booking.findByIdAndUpdate(
      { _id: bookingId },
      { isReturned: true },
      { new: true, runValidators: true, session }
    );
    await updateIsReturn?.save();
    payload.totalCost = getTotalCost?.toFixed(2);

    const result = await Booking.findByIdAndUpdate(bookingId, payload, {
      new: true,
      runValidators: true,
      session,
    })
      .populate("carId")
      .populate("user");

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const paymentUpdate = async (payload: any) => {
  const getPaymentInfo = payload;
  const totalCost = getPaymentInfo.totalCost;
  const transactionId = `TXN-${Date.now()}`;
  await Booking.updateOne(
    { _id: getPaymentInfo._id },
    {
      user: getPaymentInfo.user,
      bookedCar: getPaymentInfo?.carId?.name,
      totalCost,
      transactionId,
    }
  );
  const paymentData = {
    transactionId,
    totalCost,
    customerName: getPaymentInfo?.user?.name,
    customerEmail: getPaymentInfo?.user?.email,
    customerPhone: getPaymentInfo?.user?.phone,
  };
  const paymentSession = await initiatePayment(paymentData);
  console.log(paymentSession);
  return paymentSession;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookedFromDB,
  getUserBooking,
  cancelBookingOrDeleteBooking,
  cancelABookingFromAdminSideDB,
  approveBookingsFromDB,
  getAllConfirmBookingFromDB,
  returnCarFromDB,
  getUserReturnBooking,
  paymentUpdate,
};
