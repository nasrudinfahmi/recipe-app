import multer from "multer";

const recipeStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "assets/recipe");
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const recipeMulter = multer({
  storage: recipeStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.buffer > 5 * 1024 * 1024) {
      cb(new Error("Ukuran gambar terlalu besar."));
    } else if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Format gambar tidak didukung"));
    }
  },
}).single("img");

export { recipeMulter };
