import { catchAsync } from "../../utils/catchAsync";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(req.body, req.user);

  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Car Booked Successfully",
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
const getUserCarReturnedBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.getUserReturnBooking(req.user);

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

const cancelBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.cancelBookingOrDeleteBooking(id);

  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Booking Canceled Successfully",
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
const cancelBookingFromAdminSide = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.cancelABookingFromAdminSideDB(id);
  console.log(result);
  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Booking Canceled Successfully",
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

const approveBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.approveBookingsFromDB(id);

  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Booking Approved",
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

const getAllConfirmBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllConfirmBookingFromDB();
  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Confirm Bookings retrieved successfully",
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

const returnCar = catchAsync(async (req, res) => {
  // console.log(req.body);

  // const { bookingId: id } = req.body;
  const result = await BookingServices.returnCarFromDB(req.body);

  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Car Returned Successful",
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

const paymentUpdated = catchAsync(async (req, res) => {
  const result = await BookingServices.paymentUpdate(req.body);

  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Payment Successfully Done",
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
  cancelBooking,
  cancelBookingFromAdminSide,
  approveBooking,
  getAllConfirmBooking,
  returnCar,
  getUserCarReturnedBooking,
  paymentUpdated,
};
