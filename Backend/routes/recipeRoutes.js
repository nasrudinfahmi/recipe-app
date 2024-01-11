import express from "express";
import {
  addRecipeController,
  deleteRecipeByIdController,
  getAllRecipeController,
  getRecipeByIdRecipeController,
  updateRecipeByIdController,
} from "../controllers/recipeControllers.js";
import { recipeMulter } from "../config/multer.js";
import verifyToken from "../middleware/verifyToken.js";

const recipeRouters = express.Router();

recipeRouters.get("/recipes", getAllRecipeController);
recipeRouters.post(
  "/recipe/add",
  verifyToken,
  recipeMulter,
  addRecipeController
);
recipeRouters.get(
  "/recipe/:idRecipe",
  verifyToken,
  getRecipeByIdRecipeController
);
recipeRouters.delete(
  "/recipe/:idRecipe",
  verifyToken,
  deleteRecipeByIdController
);
recipeRouters.patch(
  "/recipe/:idRecipe",
  recipeMulter,
  updateRecipeByIdController
);

export default recipeRouters;
