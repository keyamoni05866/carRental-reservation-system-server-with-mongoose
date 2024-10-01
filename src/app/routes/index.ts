import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { CarRoutes } from "../modules/car/car.route";
import { UserRoutes } from "../modules/user/user.route";
import { BookingRoutes } from "../modules/booking/booking.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth", //here will be routes and paths
    route: AuthRoutes,
  },
  {
    path: "/cars", //here will be routes and paths
    route: CarRoutes,
  },
  {
    path: "/users", //here will be routes and paths
    route: UserRoutes,
  },
  {
    path: "/bookings", //here will be routes and paths
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
