import express, { Request, Response } from "express";
import initDB from "./config/db";
import { userRoutes } from "./modules/users/user.routes";
import { vehicleRoutes } from "./modules/vehicles/vehicle.routes";
import { bookingRoutes } from "./modules/booking/booking.routes";
import { authRoutes } from "./modules/auth/auth.route";

const app = express();

app.use(express.json());

// initialize DB
initDB();

// ---------------User------------>
app.use("/api/v1", userRoutes)

// --------------Vehicles---------------->
app.use("/api/v1/vehicles",vehicleRoutes)

// -----------------Booking--------------->
app.use("/api/v1/bookings", bookingRoutes);

// -------------------User Login-------------->
app.use("/api/v1/auth", authRoutes);

// root router
app.get("/", (req: Request, res: Response) => {
  res.send("This is the root route");
});

// not found route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not Found",
    path: req.path,
  });
});

export default app;
