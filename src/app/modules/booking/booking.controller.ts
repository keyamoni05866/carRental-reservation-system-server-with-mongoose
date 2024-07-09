import { catchAsync } from "../../utils/catchAsync";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(req.body, req.user);

  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Car booked successfully",
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

const getAllBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookedFromDB();
  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Bookings retrieved successfully",
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

const getUserBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.getUserBooking(req.user);

  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "My Bookings retrieved successfully",
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

export const BookingControllers = {
  createBooking,
  getAllBooking,
  getUserBooking,
};
