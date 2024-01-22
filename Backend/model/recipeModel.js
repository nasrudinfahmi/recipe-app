import db from "../config/db.js";
import { QUERY_RECIPE_CONSTANTS } from "../utils/constants.js";

const {
  GET_ALL_RECIPES,
  GET_RECIPE_BY_ID,
  ADD_RECIPE,
  DELETE_RECIPE_BY_ID,
  GET_OWN_RECIPES,
  GET_RECIPES_BY_TITLE_OR_MAIN_INGRE,
} = QUERY_RECIPE_CONSTANTS;

const modelGetAllRecipes = async () => {
  const [recipes] = await db.query(GET_ALL_RECIPES);
  return { recipes };
};

const modelGetRecipeById = async (idRecipe) => {
  const [recipe] = await db.query(GET_RECIPE_BY_ID, idRecipe);
  return { recipe: recipe[0] };
};

const modelGetOwnRecipe = async (idUser) => {
  const [recipes] = await db.query(GET_OWN_RECIPES, idUser);
  return { recipes };
};

const modelGetRecipesByTitleOrMainIngre = async (keyword, value) => {
  const query = GET_RECIPES_BY_TITLE_OR_MAIN_INGRE + `${keyword} LIKE ?`;
  const [recipes] = await db.query(query, `%${value}%`);
  return { recipes };
};

const modelAddRecipe = async (recipeValues) => {
  const [result] = await db.query(ADD_RECIPE, recipeValues);
  return { result };
};

const modelDeleteRecipe = async (idRecipe) => {
  const [result] = await db.query(DELETE_RECIPE_BY_ID, idRecipe);
  return { result };
};

const modelUpdateRecipe = async (columns, recipeValues) => {
  const QUERY_UPDATE_RECIPE = `UPDATE tb_recipes SET ${columns} WHERE idRecipe = ?`;
  const [result] = await db.query(QUERY_UPDATE_RECIPE, recipeValues);
  return { result };
};

export {
  modelGetAllRecipes,
  modelGetRecipeById,
  modelGetOwnRecipe,
  modelGetRecipesByTitleOrMainIngre,
  modelAddRecipe,
  modelDeleteRecipe,
  modelUpdateRecipe,
};
