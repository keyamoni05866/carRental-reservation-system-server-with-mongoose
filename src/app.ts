import express, { Application, Request, Response, application } from "express";
import cors from "cors";
import router from "./app/routes";
import notFoundRoute from "./app/middlewares/notFoundRoute";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//application routes

app.use("/api", router);

app.use(globalErrorHandler);
app.use(notFoundRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Car Rental Reservation Management System");
});

export default app;
