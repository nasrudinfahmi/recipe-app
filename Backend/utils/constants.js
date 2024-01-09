const tbRecipe = "tb_recipes";

const QUERY_RECIPE_CONSTANTS = {
  GET_ALL_RECIPES: `SELECT * FROM tb_recipes ${tbRecipe}`,
  GET_RECIPE_BY_ID: `SELECT * FROM ${tbRecipe} WHERE idRecipe = ?`,
  ADD_RECIPE: `INSERT INTO ${tbRecipe} (idRecipe, idUser, title, summary, main_ingredient, ingredients, instructions, img) VALUES (?,?,?,?,?,?,?,?)`,
  DELETE_RECIPE_BY_ID: `DELETE FROM ${tbRecipe} WHERE idRecipe = ?`,
};

const HTTP_STATUS = {
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
};

export { QUERY_RECIPE_CONSTANTS, HTTP_STATUS };
