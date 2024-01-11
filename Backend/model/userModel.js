import db from "../config/db.js";
import { QUERY_USER_CONSTANTS } from "../utils/constants.js";

const modelRegister = async (userValues) => {
  const [result] = await db.query(QUERY_USER_CONSTANTS.REGISTER, userValues);
  return { result };
};

const modelGetUserByEmail = async (email) => {
  const [user] = await db.query(QUERY_USER_CONSTANTS.GET_USER_BY_EMAIL, email);
  return { user: user[0] };
};

const modelUpdateRefreshToken = async (updateValues) => {
  const [result] = await db.query(
    QUERY_USER_CONSTANTS.UPDATE_REFRESH_TOKEN,
    updateValues
  );
  return { result };
};

const modelDeleteUser = async (email) => {
  const [result] = await db.query(QUERY_USER_CONSTANTS.DELETE_USER, email);
  return { result };
};

const modelGetUserByRefreshToken = async (refreshToken) => {
  const [user] = await db.query(
    QUERY_USER_CONSTANTS.GET_USER_BY_REFRESH_TOKEN,
    refreshToken
  );
  return { user: user[0] };
};

const modelUpdateUser = async (updateFields, updatevalues) => {
  const QURY_UPDATE_USER = `UPDATE tb_user SET ${updateFields} WHERE email = ?`;
  const [result] = await db.query(QURY_UPDATE_USER, updatevalues);
  return { result };
};

export {
  modelRegister,
  modelGetUserByEmail,
  modelUpdateRefreshToken,
  modelDeleteUser,
  modelGetUserByRefreshToken,
  modelUpdateUser,
};
