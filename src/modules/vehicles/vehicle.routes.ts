import express from "express"
import { vehiclesController } from "./vehicle.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/", auth('admin'), vehiclesController.createVehicle);

router.get("/", vehiclesController.getAllVehicles);

router.get("/:id", vehiclesController.getSingleVehicles);

router.put("/:id", auth('admin'), vehiclesController.updateVehicle);

router.delete("/:id", auth('admin'), vehiclesController.deleteVehicle);


export const vehicleRoutes = router; 