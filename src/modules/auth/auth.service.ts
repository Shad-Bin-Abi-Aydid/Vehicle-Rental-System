import bcrypt from "bcryptjs";
import { pool } from "../../config/db";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUser = async (email: string, password: string) => {
  const user = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);

  // check user exist or not
  if (user.rows.length === 0) {
    throw new Error("User not Found");
  }

  // check the password correct or not
  const matchPassword = await bcrypt.compare(password, user.rows[0].password);

  // if password didn't match
  if (!matchPassword) {
    throw new Error("Invalid Credential");
  }

  const jwtPayload = {
    id: user.rows[0].id,
    name: user.rows[0].name,
    email: user.rows[0].email,
    phone: user.rows[0].phone,
    role: user.rows[0].role,
  };

  const token = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: "20d",
  });

  // delete the user password before sanding the user details
  delete user.rows[0].password;

  return { token, user: user.rows[0] };
};

export const authServices = {
    loginUser
}
