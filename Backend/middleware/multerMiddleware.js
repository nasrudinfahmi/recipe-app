import { recipeMulter } from "../config/multer.js";

const recipeMulterMiddleware = (req, res, next) => {
  recipeMulter(req, res, (error) => {
    console.log(error);
    if (error) {
      // Menangani error seperti batasan ukuran file dan tipe file yang tidak diizinkan
      res.status(400).json({
        success: false,
        error: "Bad request error",
        message: error.message,
      });
    } else {
      // Lanjut ke proses berikutnya jika tidak ada kesalahan
      next();
    }
  });
};

export { recipeMulterMiddleware };
