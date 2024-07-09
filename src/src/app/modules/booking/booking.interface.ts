import { Types } from "mongoose";

export type TBooking = {
  date: string;
  startTime: string;
  endTime: string;
  user: Types.ObjectId;
  carId: Types.ObjectId;
  totalCost: number;
};

export type TReturn = {
  bookingId: Types.ObjectId;
  endTime: string;
};
