import express from "express";
import {
  deleteUserController,
  loginController,
  logoutController,
  registerController,
  updateUserController,
} from "../controllers/userControllers.js";
import verifyToken from "../middleware/verifyToken.js";
import { userMulter } from "../config/multer.js";

const userRouters = express.Router();

userRouters.post("/user/register", userMulter, registerController);
userRouters.post("/user/login", loginController);
userRouters.delete("/user/delete", verifyToken, deleteUserController);
userRouters.patch(
  "/user/update",
  verifyToken,
  userMulter,
  updateUserController
);
userRouters.delete("/user/logout", verifyToken, logoutController);

export default userRouters;
