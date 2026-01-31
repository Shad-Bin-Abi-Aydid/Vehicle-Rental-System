import { Request } from "express";
import { pool } from "../../config/db";

const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const vehicleData = await pool.query(
    `SELECT vehicle_name, daily_rent_price FROM vehicles WHERE id = $1`,
    [vehicle_id],
  );

  const vehicle = vehicleData.rows[0];

  //   calculate days and total daily_rent_price
  const startDate = new Date(rent_start_date as string);
  const endDate = new Date(rent_end_date as string);

  const totalRentTime = endDate.getTime() - startDate.getTime();
  const totalRentDays = totalRentTime / (1000 * 3600 * 24);

  const totalPrice = totalRentDays * Number(vehicle.daily_rent_price);

  const bookingResult = await pool.query(
    `
        INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) 
        VALUES ($1, $2, $3, $4, $5, 'active') RETURNING id
        `,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, totalPrice],
  );
  const newBookingId = bookingResult.rows[0].id;

  return {
    id: newBookingId,
    customer_id,
    vehicle_id,
    rent_start_date,
    rent_end_date,
    totalPrice,
    status: "active",
    vehicle: {
      vehicle_name: vehicle.vehicle_name,
      daily_rent_price: Number(vehicle.daily_rent_price),
    },
  };
};

// Get bookings
const getBookings = async (role: string, id: string) => {
  const baseQuery = `SELECT
        bookings.*,
        users.name as customer_name,
        users.email as customer_email,
        vehicles.vehicle_name,
        vehicles.registration_number as registration_number,
        vehicles.type as type
        FROM bookings
        JOIN users ON bookings.customer_id = users.id
        JOIN vehicles ON bookings.vehicle_id = vehicles.id`;

  if (role === "admin") {
    const result = await pool.query(baseQuery);

    const formattedData = result.rows.map((row) => ({
      id: row.id,
      customer_id:row.customer_id,
      vehicle_id:row.vehicle_id,
      rent_start_date: row.rent_start_date,
      rent_end_date: row.rent_end_date,
      total_price: row.total_price,
      status: row.status,
      customer: {
        name: row.customer_name,
        email: row.customer_email,
      },
      vehicle: {
        vehicle_name: row.vehicle_name,
        registration_number: row.registration_number,
      },
    }));

    return formattedData;
   } 
  else if(role === 'customer') {
    const query = baseQuery + ` WHERE bookings.customer_id=$1`;

    const result = await pool.query(query,[id]);

    const formattedData = result.rows.map((row) => ({
      id: row.id,
      vehicle_id:row.vehicle_id,
      rent_start_date: row.rent_start_date,
      rent_end_date: row.rent_end_date,
      total_price: row.total_price,
      status: row.status,
      vehicle: {
        vehicle_name: row.vehicle_name,
        registration_number: row.registration_number,
        type:row.type
      },
    }));

    return formattedData;
  }
};

// Update booking
const updateBooking = async (id: string, status: string, role: string) => {
  const result = await pool.query(
    `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
    [status, id],
  );

  if ((await result).rowCount === 0) {
    throw new Error("Booking not Found");
  }

  if (role === "admin") {
    // Update the vehicle availability status in vehicle table
    await pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id=$2`, [
      "available",
      result.rows[0].vehicle_id,
    ]);

    // Getting the vehicle availability_status to include in the Response
    const vehicleInfo = await pool.query(
      `SELECT availability_status from vehicles WHERE id=$1`,
      [result.rows[0].vehicle_id],
    );

    // attache the vehicle object in the booking data
    result.rows[0].vehicle = {
      availability_status: vehicleInfo.rows[0].availability_status,
    };
    return result;
  } else if (role === "customer") {
    return result;
  }
};

export const bookingServices = {
  createBooking,
  getBookings,
  updateBooking,
};
