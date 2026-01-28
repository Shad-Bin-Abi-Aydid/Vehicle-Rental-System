import express, { Request, Response } from "express";
import initDB from "./config/db";
import { userRoutes } from "./modules/users/user.routes";

const app = express();

app.use(express.json());

// initialize DB
initDB();

// ---------------User------------>
app.use("/api/v1", userRoutes)

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
