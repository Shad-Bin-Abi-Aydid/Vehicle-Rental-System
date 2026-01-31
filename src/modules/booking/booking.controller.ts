import { Request, Response } from "express";
import { bookingServices } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.createBooking(req.body);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// get bookings
const getBookings = async (req: Request, res: Response) => {
  try {
    const { role, id } = req.user!;
    const result = await bookingServices.getBookings(role, id);

    res.status(200).json({
      success: true,
      message:
        role === "admin"
          ? "Bookings retrieved successfully"
          : "Your bookings retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// update Bookings
const updateBooking = async (req: Request, res: Response) => {
  try {
    const user = req.user!;
    const { status } = req.body;
    const result = await bookingServices.updateBooking(
      req.params.id as string,
      status,
      user.role,
    );

    res.status(200).json({
      success: true,
      message:
        status === "returned"
          ? "Booking marked as returned. Vehicle is now available"
          : "Booking cancelled successfully",
      data: result?.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const bookingController = {
  createBooking,
  getBookings,
  updateBooking,
};
