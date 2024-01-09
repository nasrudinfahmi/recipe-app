import express from "express";
import {
  addRecipeController,
  deleteRecipeByIdController,
  getAllRecipeController,
  getRecipeByIdRecipeController,
  updateRecipeByIdController,
} from "../controllers/recipeControllers.js";
import { recipeMulter } from "../config/multer.js";

const recipeRouters = express.Router();

recipeRouters.get("/recipes", getAllRecipeController);
recipeRouters.post("/recipe/add", recipeMulter, addRecipeController);
recipeRouters.get("/recipe/:idRecipe", getRecipeByIdRecipeController);
recipeRouters.delete("/recipe/:idRecipe", deleteRecipeByIdController);
recipeRouters.patch(
  "/recipe/:idRecipe",
  recipeMulter,
  updateRecipeByIdController
);

export default recipeRouters;
