import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import recipeRouters from "./routes/recipeRoutes.js";
import userRouters from "./routes/userRoutes.js";
import refreshTokenRouters from "./routes/refreshTokenRoutes.js";
import { errorResponse } from "./utils/response.js";
import { HTTP_STATUS } from "./utils/constants.js";

const app = express();
const port = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(
  cors({
    credentials: process.env.CORS_CREDENTIALS === "true",
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    optionsSuccessStatus:
      parseInt(process.env.CORS_OPTIONS_SUCCESS_STATUS) || 200,
  })
);
app.use("/image", express.static(path.join(__dirname, "assets")));
app.use(cookieParser());
app.use(express.json());
app.use(recipeRouters);
app.use(userRouters);
app.use(refreshTokenRouters);

// Menangani error secara umum
app.use((error, _req, res, _next) => {
  const errorMessage = [
    "Ukuran gambar terlalu besar",
    "Format gambar tidak didukung",
  ];
  if (errorMessage.includes(error.message)) {
    return errorResponse({
      res,
      httpStatus: HTTP_STATUS.BAD_REQUEST,
      message: error.message,
    });
  } else {
    return errorResponse({
      res,
      httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
