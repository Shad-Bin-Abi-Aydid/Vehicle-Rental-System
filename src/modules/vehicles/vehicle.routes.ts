import express from "express"
import { vehiclesController } from "./vehicle.controller";

const router = express.Router();

router.post("/", vehiclesController.createVehicle);

router.get("/", vehiclesController.getAllVehicles);

router.get("/:id", vehiclesController.getSingleVehicles);

router.put("/:id", vehiclesController.updateVehicle);

router.delete("/:id", vehiclesController.deleteVehicle);


export const vehicleRoutes = router; 