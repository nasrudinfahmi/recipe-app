import { HTTP_STATUS } from "./constants.js";

const successResponse = ({ res, message, httpStatus, datas }) => {
  let response;

  switch (httpStatus) {
    case HTTP_STATUS.OK:
      response = {
        success: true,
        message: message || "Berhasil mendapatkan data.",
        datas: datas || [],
      };
      break;
    case HTTP_STATUS.CREATED:
      response = {
        success: true,
        message: message || "Berhasil menambahkan data baru.",
      };
  }
  return res.status(httpStatus).json(response);
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
    case HTTP_STATUS.UNAUTHORIZE:
      response = {
        success: false,
        error: error || "Unauthorize!",
        message: message || "Silahkan register terlebih dahulu",
      };
      break;
    case HTTP_STATUS.FORBIDDEN:
      response = {
        success: false,
        error: error || "Forbidden!",
        message:
          message ||
          "Akses ditolak. Anda tidak memiliki izin untuk mengakses sumber daya ini.",
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
