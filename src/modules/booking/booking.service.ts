import { pool } from "../../config/db";

const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const vehicleData = await pool.query(
    `SELECT vehicle_name, daily_rent_price FROM vehicles WHERE id = $1`,
    [vehicle_id],
  );

  const vehicle = vehicleData.rows[0];

  const bookingResult = await pool.query(
    `
        INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, status) 
        VALUES ($1, $2, $3, $4, 'active') RETURNING id
        `,
    [customer_id, vehicle_id, rent_start_date, rent_end_date],
  );
  const newBookingId = bookingResult.rows[0].id;

//   calculate days and total daily_rent_price
const startDate = new Date(rent_start_date as string);
const endDate = new Date(rent_end_date as string);

const totalRentTime = endDate.getTime() - startDate.getTime();
const totalRentDays = totalRentTime / (1000 * 3600 * 24)

const totalPrice = totalRentDays * Number(vehicle.daily_rent_price);

return{
    id:newBookingId,
    customer_id,
    vehicle_id,
    rent_start_date,
    rent_end_date,
    totalPrice,
    status:"active",
    vehicle:{
        vehicle_name:vehicle.vehicle_name,
        daily_rent_price:  Number(vehicle.daily_rent_price)
    }
};
};

// Get bookings


export const bookingServices = {
  createBooking,
};
