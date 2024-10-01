import { Schema, model } from "mongoose";
import { TCar } from "./car.interface";

const carSchema = new Schema<TCar>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    isElectric: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    carType: {
      type: String,
      enum: ["SUV", "Sedan", "Hatchback", "Convertible", "Coupe"],
    },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
    features: {
      type: [String],
      required: true,
    },
    AdditionalFeatures: {
      type: [String],
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

carSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Car = model<TCar>("Car", carSchema);
