export type TCar = {
  name: string;
  description: string;
  color: string;
  image: string;
  model: string;
  year: string;
  isElectric: "Yes" | "No";
  carType?: ["SUV" | "Sedan" | "Hatchback" | "Convertible" | "Coupe"];
  status: "available" | "unavailable";
  features: string[];
  AdditionalFeatures: string[];
  pricePerHour: number;
  isFeatured: boolean;
};

export type TCarQuery = {
  carType?: string;
  priceRange?: number;
  color?: string;
  features?: string;
  sortByPrice?: "asc" | "desc";
};
export type TCarQueryForBookingPage = {
  carType?: string;
  features?: string;
  name?: string;
};
