import { Types } from "mongoose";

export type TBookingForm = {
  nidOrPassport: string;
  drivingLicense: string;
  cardNumber: string;
  cardExpirationdate: string;
  cvv: string;
  startTime: string;
};

export type TBooking = {
  user?: Types.ObjectId;
  carId?: Types.ObjectId;
  totalCost?: number;
  status?: "pending" | "confirmed" | "cancelled";
  paymentStatus?: "pending" | "paid";
  transactionId?: string;
  endTime?: string;
  isBooked?: "unconfirmed" | "confirmed";
  isReturned?: boolean;
  payment: TBookingForm;
};
