import {
  modelAddRecipe,
  modelDeleteRecipe,
  modelGetAllRecipes,
  modelGetRecipeById,
} from "../model/recipeModel.js";
import { HTTP_STATUS } from "../utils/constants.js";
import { errorResponse, successResponse } from "../utils/response.js";
import {
  createImgUrl,
  generateRandomId,
  handleImageDeletion,
  isRecipeDataValid,
  splitImgUrl,
  validateUpdateData,
} from "../utils/index.js";
import { updateRecipeData } from "../services/recipeServices.js";

const getAllRecipeController = async (_req, res) => {
  try {
    const { recipes } = await modelGetAllRecipes();

    const responsePayload = {
      res,
      message: "Berhasil mendapatkan data resep",
      httpStatus: HTTP_STATUS.OK,
      datas: {
        recipe_length: recipes.length,
        recipes,
      },
    };

    return successResponse(responsePayload);
  } catch (error) {
    const responsePayload = {
      res,
      httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      error: error.message,
      message: "Terdapat kesalahan saat mendapatkan resep",
    };

    return errorResponse(responsePayload);
  }
};

const getRecipeByIdRecipeController = async (req, res) => {
  try {
    const { idRecipe } = req.params;
    const { recipe } = await modelGetRecipeById(idRecipe);

    if (!recipe) {
      const responsePayload = {
        res,
        httpStatus: HTTP_STATUS.NOT_FOUND,
        message: "Resep tidak ditemukan",
      };
      return errorResponse(responsePayload);
    }

    const responsePayload = {
      res,
      httpStatus: HTTP_STATUS.OK,
      message: "Resep ditemukan",
      datas: recipe,
    };

    return successResponse(responsePayload);
  } catch (error) {
    const responsePayload = {
      res,
      httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      error: error.message,
      message: "Gagal memperoleh resep dari database",
    };

    return errorResponse(responsePayload);
  }
};

const addRecipeController = async (req, res) => {
  try {
    let img = req.file?.filename;
    const isDataValid = isRecipeDataValid(req, "add");
    if (!isDataValid) {
      const responsePayload = {
        res,
        httpStatus: HTTP_STATUS.BAD_REQUEST,
        message: "Semua kolom harus diisi.",
      };
      handleImageDeletion(img, "recipe");
      return errorResponse(responsePayload);
    }

    const idRecipe = generateRandomId();
    const {
      idUser,
      title,
      summary,
      main_ingredient,
      ingredients,
      instructions,
    } = req.body;

    const recipeValues = [
      idRecipe,
      idUser,
      title,
      summary,
      main_ingredient,
      ingredients,
      instructions,
      (img = createImgUrl(req, img, "recipe")),
    ];

    const { result } = await modelAddRecipe(recipeValues);
    if (result.affectedRows) {
      return successResponse({
        res,
        httpStatus: HTTP_STATUS.OK,
        message: "Sukses menambahkan resep baru",
      });
    }
  } catch (error) {
    const img = req.file?.filename;
    const responsePayload = {
      res,
      httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      error: error.message,
      message: "Gagal menambahkan resep baru.",
    };
    handleImageDeletion(img, "recipe");
    return errorResponse(responsePayload);
  }
};

const deleteRecipeByIdController = async (req, res) => {
  try {
    const { idRecipe } = req.params;
    const { recipe } = await modelGetRecipeById(idRecipe);

    if (!recipe) {
      const responsePayload = {
        res,
        httpStatus: HTTP_STATUS.NOT_FOUND,
        message: "Resep tidak ditemukan",
      };
      return errorResponse(responsePayload);
    }

    const { img } = recipe;
    const { result } = await modelDeleteRecipe(idRecipe);

    if (result.affectedRows) {
      const imgName = splitImgUrl(img);
      handleImageDeletion(imgName, "recipe");

      return successResponse({
        res,
        httpStatus: HTTP_STATUS.OK,
        message: "Sukses menghapus resep.",
      });
    }
  } catch (error) {
    const responsePayload = {
      res,
      httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      error: error.message,
      message: "Gagal menghapus resep.",
    };
    return errorResponse(responsePayload);
  }
};

const updateRecipeByIdController = async (req, res) => {
  try {
    const { idRecipe } = req.params;
    const updateData = req.body;
    const img = req.file?.filename;

    const { recipe } = await modelGetRecipeById(idRecipe);
    if (!recipe) {
      handleImageDeletion(img, "recipe");
      const responsePayload = {
        res,
        httpStatus: HTTP_STATUS.NOT_FOUND,
        message: "Resep yang akan diperbarui tidak ditemukan.",
      };
      return errorResponse(responsePayload);
    }

    const validateErrorResult = validateUpdateData(updateData, img, res);
    if (validateErrorResult) {
      return validateErrorResult;
    }

    let updateFields = [];
    let updateValues = [];

    for (const key in updateData) {
      if (updateData[key].trim()) {
        updateFields.push(`${key} = ?`);
        updateValues.push(updateData[key].trim());
      }
    }

    if (img) {
      const imgUrl = createImgUrl(req, img, "recipe");
      updateFields.push("img = ?");
      updateValues.push(imgUrl);
    }

    if (updateFields.length === 0 || updateValues === 0) {
      const responsePayload = {
        res,
        httpStatus: HTTP_STATUS.BAD_REQUEST,
        message: "Tidak ada data yang diberikan untuk diperbarui",
      };
      return errorResponse(responsePayload);
    }

    const updateResult = await updateRecipeData(
      idRecipe,
      updateFields,
      updateValues,
      img,
      recipe
    );
    if (updateResult) {
      return successResponse({
        res,
        httpStatus: HTTP_STATUS.OK,
        message: "Berhasil memperbarui resep.",
      });
    } else {
      throw Error;
    }
  } catch (error) {
    const img = req.file?.filename;
    handleImageDeletion(img, "recipe");

    const responsePayload = {
      res,
      httpStatus: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: "Terdapat kesalahan saat memperbarui resep.",
    };
    return errorResponse(responsePayload);
  }
};

export {
  getAllRecipeController,
  getRecipeByIdRecipeController,
  addRecipeController,
  deleteRecipeByIdController,
  updateRecipeByIdController,
};
