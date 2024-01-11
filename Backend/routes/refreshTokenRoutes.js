import express from "express";
import { refreshTokenController } from "../controllers/refreshTokenController.js";

const refreshTokenRouters = express.Router();

refreshTokenRouters.get("/token", refreshTokenController);

export default refreshTokenRouters;
