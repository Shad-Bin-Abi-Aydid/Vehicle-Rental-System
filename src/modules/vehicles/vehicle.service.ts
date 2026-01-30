import { pool } from "../../config/db";

// create vehicle
const createVehicle = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ],
  );

  return result;
};

// get all vehicle
const getAllVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result;
};

// Get Single Vehicles
const getSingleVehicle = async (id: string) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [id]);
  return result;
};

// Update Vehicle
const updateVehicle = async (
  vehicle_name: string,
  type: string,
  registration_number: string,
  daily_rent_price: number,
  availability_status: string,
  id: string,
) => {
  const result = await pool.query(
    `
    UPDATE vehicles SET vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4, availability_status=$5 WHERE id=$6 RETURNING *
    `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      id,
    ],
  );

  return result;
};

// Delete Vehicle
const deleteVehicle = async (id: string) => {
  const bookingInfo = await pool.query(
    `SELECT * FROM bookings WHERE vehicle_id=$1`,
    [id],
  );

  // check this vehicle is active in booking or not
  if (bookingInfo.rows[0].status === "active") {
    throw new Error("Can't delete!!, This vehicle is an active booking");
  }

  const result = await pool.query(`DELETE FROM vehicles WHERE id=$1`, [id]);
  return result;
};

export const vehiclesServices = {
  createVehicle,
  getAllVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
