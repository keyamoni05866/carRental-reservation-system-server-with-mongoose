import { Types } from "mongoose";

export type TComment = {
  car: Types.ObjectId;
  user: Types.ObjectId;
  rating: number;
  comment: string;
};
