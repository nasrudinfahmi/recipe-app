import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { HTTP_STATUS } from "./constants.js";
import { errorResponse } from "./response.js";

const generateRandomId = () => {
  const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
  return String(uniqueSuffix);
};

const createImgUrl = (req, img, path) => {
  if (img) {
    const imgUrl = `${req.protocol}://${req.get("host")}/image/${path}/${img}`;
    return imgUrl;
  }
  return "";
};

const handleImageDeletion = (img, pathname) => {
  if (img) {
    const directory = `assets/${pathname}/${img}`;
    fs.unlink(directory, (err) => {
      if (err) console.log(err);
    });
  }
};

const isRecipeDataValid = (req, action) => {
  const img = req.file?.filename;
  const { idUser, title, summary, main_ingredient, ingredients, instructions } =
    req.body;

  if (
    (action === "add" && !idUser?.trim()) ||
    !title?.trim() ||
    !summary?.trim() ||
    !main_ingredient?.trim() ||
    !ingredients?.trim() ||
    !instructions?.trim() ||
    !img
  ) {
    return false;
  }

  return true;
};

const splitImgUrl = (imgUrl) => {
  const imgName = imgUrl.split("/").pop();
  return imgName;
};

const validateUpdateData = (updateData, img, res) => {
  if (Object.keys(updateData).length === 0 && !img) {
    const responsePayload = {
      res,
      httpStatus: HTTP_STATUS.BAD_REQUEST,
      message: "Tidak ada data yang diberikan untuk diperbarui",
    };
    return errorResponse(responsePayload);
  }
  return false;
};

const isInvalidDataRegister = (data) => {
  if (Object.keys(data).length === 0) {
    return true;
  }
  return false;
};

const isUserDataValid = (req) => {
  const { username, email, password } = req.body;

  if (!username?.trim() || !email?.trim() || !password?.trim()) {
    return false;
  }
  return true;
};

const checkPassword = (req) => {
  const { password, confPassword } = req.body;
  if (password.trim() !== confPassword.trim()) {
    return false;
  }
  return true;
};

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const comparePassword = async (password, passwordHash) => {
  const isMatch = await bcrypt.compare(password, passwordHash);
  return isMatch;
};

const createAccessToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
    expiresIn: "20s",
  });
  return accessToken;
};

const createRefreshToken = (payload) => {
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, {
    expiresIn: "1d",
  });
  return refreshToken;
};

const validateInput = (req) => {
  const { username, email, password } = req.body;
  const img = req.file?.filename;

  if (!email) {
    throw new Error("Anda tidak memasukkan email!");
  }

  if (!username?.trim() && !password?.trim() && !img) {
    throw new Error("Tidak ada data yang dimasukkan!");
  }

  return { username, email, password };
};

const handleUpdateUserFields = async (req, email, user) => {
  const img = req.file?.filename;
  const imgUrl = img ? createImgUrl(req, img, "user") : user.img;

  let updateFields = [];
  let updateValues = [];

  for (const [key, value] of Object.entries(req.body)) {
    if (key !== "email" && value.trim()) {
      updateFields.push(`${key} = ?`);

      if (key === "password") {
        const hashedPassword = await hashPassword(value);
        updateValues.push(hashedPassword);
      } else {
        updateValues.push(value);
      }
    }
  }

  updateFields.push("img = ?");
  updateValues.push(imgUrl, email);

  return { updateFields, updateValues, img };
};

const checkStatusError = (error, errorMessage) => {
  if (Object.values(error).includes(errorMessage)) {
    return HTTP_STATUS.BAD_REQUEST;
  }
  return HTTP_STATUS.INTERNAL_SERVER_ERROR;
};

export {
  generateRandomId,
  isRecipeDataValid,
  createImgUrl,
  handleImageDeletion,
  splitImgUrl,
  validateUpdateData,
  isInvalidDataRegister,
  isUserDataValid,
  checkPassword,
  hashPassword,
  comparePassword,
  createAccessToken,
  createRefreshToken,
  validateInput,
  handleUpdateUserFields,
  checkStatusError,
};
