import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../config/db";

const auth = (...roles: ("admin" | "customer")[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error("You are not authorized!");
      }

      const parts = authHeader.split(" ");
      const token = parts[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Token missing from Bearer header",
        });
      }

      // verify the token
      const decoded = jwt.verify(
        token,
        config.jwt_secret as string,
      ) as JwtPayload;

      const user = await pool.query(`SELECT * FROM users WHERE email=$1`, [
        decoded.email,
      ]);

      if (user.rows.length === 0) {
        throw new Error("User not found");
      }

      req.user = decoded;

      // if user not the approprite role
      if (roles.length && !roles.includes(decoded.role)) {
        throw new Error("You are not authorized");
      }

      next();
    } catch (err: any) {
      res.status(401).json({
        success: false,
        message: err.message || "Authentication Failed",
      });
    }
  };
};

export default auth;
