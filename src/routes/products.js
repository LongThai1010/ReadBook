const express = require("express");
const router = express.Router();
const multer = require("multer");
//khai báo sử dụng multer
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const productController = require("../app/controllers/ProductController");
const authController = require("../app/controllers/AuthController");
const authMiddleware = require("../app/middlewares/auth");

// add Slug

router.get("/create", authMiddleware.Checklogin, productController.create);
router.post(
  "/store",
  upload.single("image"),

  productController.store
);
router.get("/:id/edit", productController.edit);
router.put("/:id", productController.update);
router.delete("/:id", productController.destroy);
router.get("/:slug", productController.show);

router.get("/searchProduct/show", productController.searchProducts);

router.post(
  "/createCmt",
  authMiddleware.Checklogin,
  productController.createCmt
);

module.exports = router;
