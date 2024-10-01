import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import { TBooking, TBookingForm } from "./booking.interface";

const bookingFormSchema = new Schema<TBookingForm>({
  nidOrPassport: { type: String, required: true },
  drivingLicense: { type: String, required: true },
  cardNumber: { type: String, required: true },
  cardExpirationdate: { type: String, required: true },
  cvv: { type: String, required: true },
  startTime: { type: String, required: true },
});

const bookingSchema = new Schema<TBooking>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    carId: {
      type: Schema.Types.ObjectId,
      ref: "Car",
      required: true,
      unique: true,
    },
    endTime: {
      type: String,
      default: null,
    },
    totalCost: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    transactionId: { type: String },
    isBooked: {
      type: String,
      enum: ["unconfirmed", "confirmed"],
      default: "unconfirmed",
    },
    payment: { type: bookingFormSchema },
  },
  {
    timestamps: true,
  }
);

export const Booking = model<TBooking>("Booking", bookingSchema);
