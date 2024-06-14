import { catchAsync } from "../utils/catchAsync";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(req.body, req.user);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Car booked successfully",
    data: result,
  });
});

const getAllBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookedFromDB();
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const getUserBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.getUserBooking(req.user);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "My Bookings retrieved successfully",
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBooking,
  getUserBooking,
};
