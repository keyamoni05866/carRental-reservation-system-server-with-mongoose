export const calculateTotalDurationOfTime = (
  startDateAndTime: string,
  endDateAndTime: string,
  pricePerHour: number
): number => {
  const startDate = new Date(startDateAndTime);
  const endDate = new Date(endDateAndTime);
  if (endDate <= startDate) {
    throw new Error("End Time Should be After");
  }
  const duration = endDate.getTime() - startDate.getTime();
  const inHours = duration / (1000 * 60 * 60);
  const totalCost = inHours * pricePerHour;
  return totalCost;
};
