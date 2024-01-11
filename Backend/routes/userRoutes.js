import express from "express";
import {
  deleteUserController,
  loginController,
  logoutController,
  registerController,
  updateUserController,
} from "../controllers/userControllers.js";
import { userMulter } from "../config/multer.js";

const userRouters = express.Router();

userRouters.post("/user/register", userMulter, registerController);
userRouters.post("/user/login", loginController);
userRouters.delete("/user/delete", deleteUserController);
userRouters.patch("/user/update", userMulter, updateUserController);
userRouters.delete("/user/logout", logoutController);

export default userRouters;
