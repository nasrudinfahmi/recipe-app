const tbRecipe = "tb_recipes";
const tbUser = "tb_user";

const QUERY_RECIPE_CONSTANTS = {
  GET_ALL_RECIPES: `SELECT * FROM tb_recipes ${tbRecipe}`,
  GET_RECIPE_BY_ID: `SELECT * FROM ${tbRecipe} WHERE idRecipe = ?`,
  ADD_RECIPE: `INSERT INTO ${tbRecipe} (idRecipe, idUser, title, summary, main_ingredient, ingredients, instructions, img) VALUES (?,?,?,?,?,?,?,?)`,
  DELETE_RECIPE_BY_ID: `DELETE FROM ${tbRecipe} WHERE idRecipe = ?`,
};

const QUERY_USER_CONSTANTS = {
  REGISTER: `INSERT INTO ${tbUser} (idUser, username, email, password, img) VALUES (?,?,?,?,?)`,
  GET_USER_BY_EMAIL: `SELECT username, email, password, img, refreshToken FROM ${tbUser} WHERE ${tbUser}.email = ?`,
  GET_USER_BY_REFRESH_TOKEN: `SELECT username, email, img FROM ${tbUser} WHERE ${tbUser}.refreshToken = ?`,
  UPDATE_REFRESH_TOKEN: `UPDATE ${tbUser} SET refreshToken = ? WHERE email = ?`,
  DELETE_USER: `DELETE FROM ${tbUser} WHERE email = ?`,
  UPD_USER_BY_REFRESH_TOKEN: `SELECT username, email, img, refreshToken FROM ${tbUser} WHERE ${tbUser}.refreshToken = ?`,
};

const USER_ERROR_MESSAGE = {
  BAD_REQUEST: {
    INVALID_DATA: "Data tidak valid!",
    REGISTERED: "Email anda sudah terdaftar!",
    UNMATCHED_PASSWORD: "Password tidak cocok!",
    WRONG_PASSWORD: "Pasword salah!",
    UNREGISTERED_ACCOUNT: "Email belum terdaftar!",
  },
  FORBIDDEN_REQUEST: {
    FORBIDDEN: "Akses terlarang!",
  },
};

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNAUTHORIZE: 401,
  FORBIDDEN: 403,
};

export {
  QUERY_RECIPE_CONSTANTS,
  QUERY_USER_CONSTANTS,
  HTTP_STATUS,
  USER_ERROR_MESSAGE,
};
