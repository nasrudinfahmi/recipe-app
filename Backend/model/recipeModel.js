import db from "../config/db.js";
import { QUERY_RECIPE_CONSTANTS } from "../utils/constants.js";

const { GET_ALL_RECIPES, GET_RECIPE_BY_ID, ADD_RECIPE, DELETE_RECIPE_BY_ID } =
  QUERY_RECIPE_CONSTANTS;

const modelGetAllRecipes = async () => {
  const [recipes] = await db.query(GET_ALL_RECIPES);
  return { recipes };
};

const modelGetRecipeById = async (idRecipe) => {
  const [recipe] = await db.query(GET_RECIPE_BY_ID, idRecipe);
  return { recipe: recipe[0] };
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
  modelAddRecipe,
  modelDeleteRecipe,
  modelUpdateRecipe,
};
