import { modelUpdateRecipe } from "../model/recipeModel.js";
import { handleImageDeletion, splitImgUrl } from "../utils/index.js";

const updateRecipeData = async (
  idRecipe,
  updateFields,
  updateValues,
  img,
  recipe
) => {
  updateValues.push(idRecipe);
  const { result } = await modelUpdateRecipe(updateFields, updateValues);

  if (result.affectedRows) {
    if (img) {
      const oldImg = splitImgUrl(recipe.img);
      handleImageDeletion(oldImg, "recipe");
    }
    return true;
  }
  return false;
};

export { updateRecipeData };
