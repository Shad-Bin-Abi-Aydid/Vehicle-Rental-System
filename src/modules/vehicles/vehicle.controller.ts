import { Request, Response } from "express";
import { vehiclesServices } from "./vehicle.service";

// create vehicles
const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.createVehicle(req.body);

    res.status(201).json({
      success: true,
      message: "Vehicles created Successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//get all vehicles
const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.getAllVehicles();
    res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// get single vehicle
const getSingleVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.getSingleVehicle(
      req.params.id as string,
    );
    // if didn't found any data
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle didn't found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle retrieved successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      data: err,
    });
  }
};

// update vehicle
const updateVehicle = async (req: Request, res: Response) => {
  try {
    const {
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    } = req.body;
    const result = await vehiclesServices.updateVehicle(
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      req.params.id as string,
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle didn't find",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle updated successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete vehicle
const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.deleteVehicle(
      req.params.id as string,
    );
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle didn't find",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle deleted successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const vehiclesController = {
  createVehicle,
  getAllVehicles,
  getSingleVehicles,
  updateVehicle,
  deleteVehicle,
};
