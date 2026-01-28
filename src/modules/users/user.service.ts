import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const createUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  const hashedPassword = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, email, hashedPassword, phone, role],
  );
  delete result.rows[0].password;

  return result;
};

// Get all users
const getUsers = async () => {
  const result = await pool.query(`
        SELECT id, name, email, phone, role FROM users
        
        `);
  return result;
};

// update user
const updateUser = async (
  name: string,
  email: string,
  phone: string,
  role: string,
  id: string,
) => {
  const result = await pool.query(
    `
        UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING *
        `,
    [name, email, phone, role, id],
  );
  delete result.rows[0].password;
  return result;
};

// Delete user
const deleteUser = async (id: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id=$1`, [id]);

  return result;
};

export const userServices = {
  createUser,
  getUsers,
  updateUser,
  deleteUser
};
