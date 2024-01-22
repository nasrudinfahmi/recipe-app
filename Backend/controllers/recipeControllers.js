import {
  modelAddRecipe,
  modelDeleteRecipe,
  modelGetAllRecipes,
  modelGetOwnRecipe,
  modelGetRecipesByTitleOrMainIngre,
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
import { RECIPE_ERROR_MESSAGE } from "../utils/constants.js";

const { NOT_FOUND, BAD_REQUEST } = RECIPE_ERROR_MESSAGE;

const getAllRecipeController = async (_req, res) => {
  try {
    const { recipes } = await modelGetAllRecipes();
    if (recipes.length === 0) {
      throw new Error(NOT_FOUND.NOT_FOUND_RECIPE);
    }

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
    const httpStatus =
      error.message === NOT_FOUND.NOT_FOUND_RECIPE
        ? HTTP_STATUS.NOT_FOUND
        : HTTP_STATUS.INTERNAL_SERVER_ERROR;

    const responsePayload = {
      res,
      httpStatus,
      error: "Terdapat kesalahan saat mendapatkan resep",
      message: error.message,
    };

    return errorResponse(responsePayload);
  }
};

const getRecipeByIdRecipeController = async (req, res) => {
  try {
    const { idRecipe } = req.params;
    const { recipe } = await modelGetRecipeById(idRecipe);

    if (!recipe) {
      throw new Error(NOT_FOUND.NOT_FOUND_RECIPE);
    }

    const responsePayload = {
      res,
      httpStatus: HTTP_STATUS.OK,
      message: "Resep ditemukan",
      datas: recipe,
    };

    return successResponse(responsePayload);
  } catch (error) {
    const httpStatus =
      error.message === NOT_FOUND.NOT_FOUND_RECIPE
        ? HTTP_STATUS.NOT_FOUND
        : HTTP_STATUS.INTERNAL_SERVER_ERROR;

    const responsePayload = {
      res,
      httpStatus,
      error: "Gagal memperoleh resep dari database",
      message: error.message,
    };

    return errorResponse(responsePayload);
  }
};

const getRecipeByIdUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    const { recipes } = await modelGetOwnRecipe(idUser);

    if (recipes.length === 0) {
      throw new Error(NOT_FOUND.NOT_FOUND_RECIPE);
    }

    const responsePayload = {
      res,
      httpStatus: HTTP_STATUS.OK,
      message: "Berhasil mendapatkan resep makanana.",
      datas: recipes,
    };

    return successResponse(responsePayload);
  } catch (error) {
    const httpStatus =
      error.message === NOT_FOUND.NOT_FOUND_RECIPE
        ? HTTP_STATUS.NOT_FOUND
        : HTTP_STATUS.INTERNAL_SERVER_ERROR;

    const responsePayload = {
      res,
      httpStatus,
      error: "Gagal Mendapatkan Resep Makanan.",
      message: error.message,
    };

    return errorResponse(responsePayload);
  }
};

const getRecipesByTitleOrMainIngre = async (req, res) => {
  try {
    const { title, mainIngre } = req.query;

    if (
      (!title || title?.trim() === "") &&
      (!mainIngre || mainIngre?.trim() === 0)
    ) {
      throw new Error(BAD_REQUEST.EMPTY_KEYWORD);
    }

    if (title) {
      const { recipes } = await modelGetRecipesByTitleOrMainIngre(
        "title",
        title.trim()
      );
      if (recipes.length === 0) {
        throw new Error(NOT_FOUND.NOT_FOUND_RECIPE);
      }

      const responsePayload = {
        res,
        message: "Resep ditemukan.",
        httpStatus: HTTP_STATUS.OK,
        datas: {
          recipes_length: recipes.length,
          recipes,
        },
      };
      return successResponse(responsePayload);
    }

    if (mainIngre) {
      const { recipes } = await modelGetRecipesByTitleOrMainIngre(
        "main_ingredient",
        mainIngre.trim()
      );

      if (recipes.length === 0) {
        throw new Error(NOT_FOUND.NOT_FOUND_RECIPE);
      }

      const responsePayload = {
        res,
        message: "Resep ditemukan.",
        httpStatus: HTTP_STATUS.OK,
        datas: {
          recipes_length: recipes.length,
          recipes,
        },
      };
      return successResponse(responsePayload);
    }
  } catch (error) {
    const httpStatus =
      error.message === BAD_REQUEST.EMPTY_KEYWORD
        ? HTTP_STATUS.BAD_REQUEST
        : error.message === NOT_FOUND.NOT_FOUND_RECIPE
        ? HTTP_STATUS.NOT_FOUND
        : HTTP_STATUS.INTERNAL_SERVER_ERROR;

    const responsePayload = {
      res,
      httpStatus,
      error: "Gagal Mendapatkan Resep Makanan.",
      message: error.message,
    };

    return errorResponse(responsePayload);
  }
};

const addRecipeController = async (req, res) => {
  try {
    let img = req.file?.filename;
    const isDataValid = isRecipeDataValid(req, "add");
    if (!isDataValid) {
      throw new Error(BAD_REQUEST.ALL_FIELDS_NOT_FILLED);
    }
    // if (!isDataValid) {
    //   const responsePayload = {
    //     res,
    //     httpStatus: HTTP_STATUS.BAD_REQUEST,
    //     message: "Semua kolom harus diisi.",
    //   };
    //   handleImageDeletion(img, "recipe");
    //   return errorResponse(responsePayload);
    // }

    const idRecipe = generateRandomId();
    const imgUrl = createImgUrl(req, img, "recipe");
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
      imgUrl,
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
    const httpStatus =
      error.message === BAD_REQUEST.ALL_FIELDS_NOT_FILLED
        ? HTTP_STATUS.BAD_REQUEST
        : HTTP_STATUS.INTERNAL_SERVER_ERROR;

    const responsePayload = {
      res,
      httpStatus,
      error: "Gagal menambahkan resep baru.",
      message: error.message,
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
      throw new Error(NOT_FOUND.NOT_FOUND_RECIPE);
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
    const httpStatus =
      error.message === NOT_FOUND.NOT_FOUND_RECIPE
        ? HTTP_STATUS.NOT_FOUND
        : HTTP_STATUS.INTERNAL_SERVER_ERROR;

    const responsePayload = {
      res,
      httpStatus,
      error: "Gagal menghapus resep.",
      message: error.message,
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
      throw new Error(NOT_FOUND.NOT_FOUND_RECIPE);
    }

    const validateErrorResult = validateUpdateData(updateData, img);
    if (validateErrorResult) {
      throw new Error(BAD_REQUEST.NO_DATA_UPDATED);
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
    } else {
      updateFields.push("img = ?");
      updateValues.push(recipe.img);
    }

    if (updateFields.length === 0 || updateValues === 0) {
      throw new Error(BAD_REQUEST.NO_DATA_UPDATED);
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
    }
  } catch (error) {
    const img = req.file?.filename;

    const httpStatus =
      error.message === NOT_FOUND.NOT_FOUND_RECIPE
        ? HTTP_STATUS.NOT_FOUND
        : error.message === BAD_REQUEST.NO_DATA_UPDATED
        ? HTTP_STATUS.BAD_REQUEST
        : HTTP_STATUS.INTERNAL_SERVER_ERROR;

    const responsePayload = {
      res,
      httpStatus,
      error: "Terdapat kesalahan saat memperbarui resep.",
      message: error.message,
    };
    handleImageDeletion(img, "recipe");
    return errorResponse(responsePayload);
  }
};

export {
  getAllRecipeController,
  getRecipeByIdRecipeController,
  getRecipeByIdUser,
  getRecipesByTitleOrMainIngre,
  addRecipeController,
  deleteRecipeByIdController,
  updateRecipeByIdController,
};
