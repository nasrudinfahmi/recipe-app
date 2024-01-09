import { HTTP_STATUS } from "./constants.js";

const successResponse = ({ res, message, httpStatus, datas }) => {
  return res.status(httpStatus).json({
    success: true,
    message: message,
    datas: datas,
  });
};

const errorResponse = ({ res, httpStatus, error, message }) => {
  let response;

  switch (httpStatus) {
    case HTTP_STATUS.BAD_REQUEST:
      response = {
        success: false,
        error: error || "Bad request error",
        message: message || "Invalid request data",
      };
      break;
    case HTTP_STATUS.NOT_FOUND:
      response = {
        success: false,
        error: error || "Not found error",
        message: message || "Resep tidak ditemukan",
      };
      break;
    default:
      response = {
        success: false,
        error: error || "Internal server error",
        message:
          message || "Terdapat kesalahan saat fetching ke api 'recipe-api'",
      };
      break;
  }
  return res.status(httpStatus).json(response);
};

export { successResponse, errorResponse };
