import express from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/auth/signup", userController.createUser);

router.get("/users", auth("admin"), userController.getUsers);

router.put("/users/:id", auth("admin", "customer"), userController.updateUser);

router.delete("/users/:id", auth("admin"), userController.deleteUser);

export const userRoutes = router;
