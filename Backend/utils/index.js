import fs from "fs";

const generateRandomId = () => {
  const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
  return String(uniqueSuffix);
};

const createImgUrl = (req, img, path) => {
  const imgUrl = `${req.protocol}://${req.get("host")}/image/${path}/${img}`;
  return imgUrl;
};

const handleImageDeletion = (img, pathname) => {
  if (img) {
    const directory = `assets/${pathname}/${img}`;
    fs.unlink(directory, (err) => {
      if (err) console.log(err);
    });
  }
};

const isRecipeDataValid = (req, action) => {
  const img = req.file?.filename;
  const { idUser, title, summary, main_ingredient, ingredients, instructions } =
    req.body;

  if (
    (action === "add" && !idUser?.trim()) ||
    !title?.trim() ||
    !summary?.trim() ||
    !main_ingredient?.trim() ||
    !ingredients?.trim() ||
    !instructions?.trim() ||
    !img
  ) {
    return false;
  }

  return true;
};

const splitImgUrl = (imgUrl) => {
  const imgName = imgUrl.split("/").pop();
  return imgName;
};

const validateUpdateData = (updateData, img, res) => {
  if (Object.keys(updateData).length === 0 && !img) {
    const responsePayload = {
      res,
      httpStatus: HTTP_STATUS.BAD_REQUEST,
      message: "Tidak ada data yang diberikan untuk diperbarui",
    };
    return errorResponse(responsePayload);
  }
  return false;
};

export {
  generateRandomId,
  isRecipeDataValid,
  createImgUrl,
  handleImageDeletion,
  splitImgUrl,
  validateUpdateData,
};
