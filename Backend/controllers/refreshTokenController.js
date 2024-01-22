import jwt from "jsonwebtoken";
import { modelGetUserByRefreshToken } from "../model/userModel.js";
import { checkStatusError, createAccessToken } from "../utils/index.js";
import { HTTP_STATUS, USER_ERROR_MESSAGE } from "../utils/constants.js";
import { errorResponse, successResponse } from "../utils/response.js";

const { FORBIDDEN_REQUEST } = USER_ERROR_MESSAGE;

const refreshTokenController = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw new Error(FORBIDDEN_REQUEST.FORBIDDEN);

    const { user } = await modelGetUserByRefreshToken(refreshToken);
    if (!user) throw new Error(FORBIDDEN_REQUEST.FORBIDDEN);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (error) => {
      if (error) throw new Error(FORBIDDEN_REQUEST.FORBIDDEN);
    });

    const accessToken = createAccessToken(user);
    const responsePayload = {
      res,
      message: "Berhasil mendapatkan refresh token",
      httpStatus: HTTP_STATUS.OK,
      datas: accessToken,
    };

    return successResponse(responsePayload);
  } catch (error) {
    const httpStatus =
      error.message === FORBIDDEN_REQUEST.FORBIDDEN
        ? HTTP_STATUS.FORBIDDEN
        : HTTP_STATUS.INTERNAL_SERVER_ERROR;

    const responsePayload = {
      res,
      httpStatus,
      error: "Terdapat kesalahan saat generate refresh token baru",
      message: error.message,
    };
    return errorResponse(responsePayload);
  }
};

export { refreshTokenController };
