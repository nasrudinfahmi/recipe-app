import {
  modelDeleteUser,
  modelGetUserByEmail,
  modelGetUserByRefreshToken,
  modelRegister,
  modelUpdateRefreshToken,
  modelUpdateUser,
} from "../model/userModel.js";
import { validateUser } from "../services/userServices.js";
import { HTTP_STATUS, USER_ERROR_MESSAGE } from "../utils/constants.js";
import {
  checkPassword,
  comparePassword,
  createAccessToken,
  createImgUrl,
  createRefreshToken,
  generateRandomId,
  handleImageDeletion,
  handleUpdateUserFields,
  hashPassword,
  isUserDataValid,
  splitImgUrl,
  isInvalidDataRegister,
  validateInput,
  checkStatusError,
} from "../utils/index.js";
import { errorResponse, successResponse } from "../utils/response.js";

const { BAD_REQUEST, FORBIDDEN_REQUEST } = USER_ERROR_MESSAGE;

const registerController = async (req, res) => {
  try {
    const userValues = req.body;
    const img = req.file?.filename;
    const imgUrl = createImgUrl(req, img, "user");

    const isInvalidData = isInvalidDataRegister(userValues);
    if (isInvalidData) {
      throw new Error(BAD_REQUEST.INVALID_DATA);
    }

    const isUservaluesValid = isUserDataValid(req);
    if (!isUservaluesValid) {
      throw new Error(BAD_REQUEST.INVALID_DATA);
    }

    const { user } = await modelGetUserByEmail(userValues.email);
    if (user) {
      throw new Error(BAD_REQUEST.REGISTERED);
    }

    const isPasswordMatch = checkPassword(req);
    if (!isPasswordMatch) {
      throw new Error(BAD_REQUEST.UNMATCHED_PASSWORD);
    }

    const idUser = generateRandomId();
    const { username, email, password } = userValues;
    const hashedPassword = await hashPassword(password);
    const dataValues = [idUser, username, email, hashedPassword, imgUrl];

    const { result } = await modelRegister(dataValues);
    if (result.affectedRows) {
      const responsePayload = {
        res,
        httpStatus: HTTP_STATUS.CREATED,
        message: "Registrasi berhasil",
      };
      return successResponse(responsePayload);
    }
  } catch (error) {
    const img = req.file?.filename;
    const errorMessage = error.message;
    const httpStatus = checkStatusError(BAD_REQUEST, errorMessage);

    handleImageDeletion(img, "user");

    const responsePayload = {
      res,
      httpStatus,
      error: "Terdapat kesalahan saat registrasi",
      message: error.message,
    };

    return errorResponse(responsePayload);
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user } = await validateUser(email);

    const isMatchPassword = await comparePassword(password, user.password);
    if (!isMatchPassword) {
      throw new Error(BAD_REQUEST.WRONG_PASSWORD);
    }

    const payload = {
      idUser: user.idUser,
      username: user.username,
      email: user.email,
      img: user.img,
    };

    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);

    const updateValue = [refreshToken, user.email];
    const { result } = await modelUpdateRefreshToken(updateValue);

    if (result.affectedRows) {
      res.cookie("refreshToken", refreshToken, {
        maxAge: 24 * 60 * 60 * 1000, // exp dalam 1 hari
        httpOnly: true,
      });

      return res.status(200).json({
        success: true,
        accessToken,
      });
    }
  } catch (error) {
    const errorMessage = error.message;
    const httpStatus = checkStatusError(BAD_REQUEST, errorMessage);

    const responsePayload = {
      res,
      httpStatus,
      error: "Terdapat kesalahan saat login",
      message: error.message,
    };

    return errorResponse(responsePayload);
  }
};

const deleteUserController = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    const { user } = await validateUser(req.body.email);

    const { result } = await modelDeleteUser(user.email);
    if (result.affectedRows) {
      const img = splitImgUrl(user.img);
      handleImageDeletion(img, "user");

      if (refreshToken) res.clearCookie("refreshToken");

      const responsePayload = {
        res,
        httpStatus: HTTP_STATUS.OK,
        message: `Berhasil menghapus akun ${user.email}`,
      };
      return successResponse(responsePayload);
    }
  } catch (error) {
    const responsePayload = {
      res,
      httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      error: "Terdapat kesalahan saat menghapus akun data",
      message: error.message,
    };
    return errorResponse(responsePayload);
  }
};

const updateUserController = async (req, res) => {
  try {
    const { email } = validateInput(req);
    const { user } = await validateUser(email);
    const { updateFields, updateValues, img } = await handleUpdateUserFields(
      req,
      email,
      user
    );

    const { result } = await modelUpdateUser(updateFields, updateValues);
    if (result.affectedRows) {
      if (img) {
        const oldImg = splitImgUrl(user.img);
        handleImageDeletion(oldImg, "user");
      }

      const responsePayload = {
        res,
        httpStatus: HTTP_STATUS.OK,
        message: "Akun berhasil diperbarui.",
      };
      return successResponse(responsePayload);
    }
  } catch (error) {
    const img = req.file?.filename;
    handleImageDeletion(img, "user");

    const responsePayload = {
      res,
      httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      error: "Terdapat kesalahan saat memperbarui akun",
      message: error.message,
    };
    return errorResponse(responsePayload);
  }
};

const logoutController = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw new Error(FORBIDDEN_REQUEST.FORBIDDEN);
    }

    const { user } = await modelGetUserByRefreshToken(refreshToken);
    if (!user) {
      throw new Error(FORBIDDEN_REQUEST.FORBIDDEN);
    }

    const { result } = await modelUpdateRefreshToken(["", user.email]);
    if (result.affectedRows) {
      if (refreshToken) res.clearCookie("refreshToken");
      return successResponse({
        res,
        httpStatus: HTTP_STATUS.OK,
        message: "Logout sukses",
      });
    }
  } catch (error) {
    const errorMessage = error.message;
    const httpStatus = checkStatusError(
      FORBIDDEN_REQUEST.FORBIDDEN,
      errorMessage
    );

    const responsePayload = {
      res,
      httpStatus,
      error: "Terdapat kesalahan saat memperbarui akun",
      message: error.message,
    };
    return errorResponse(responsePayload);
  }
};

export {
  registerController,
  loginController,
  deleteUserController,
  updateUserController,
  logoutController,
};
