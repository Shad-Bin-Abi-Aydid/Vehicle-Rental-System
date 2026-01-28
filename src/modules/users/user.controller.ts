import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.createUser(req.body);

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// get all user
const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUsers();

    res.status(200).json({
      success: true,
      message: "Users retrieved Successfully",
      data: result.rows,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// update user
const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, role } = req.body;
    const result = await userServices.updateUser(
      name,
      email,
      phone,
      role,
      req.params.id as string,
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User didn't find",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User updated Successfully",
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

// delete user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.deleteUser(req.params.id as string);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User didn't find",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted Successfully",
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

export const userController = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};
