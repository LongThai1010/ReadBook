const express = require("express");
const router = express.Router();

const authController = require("../app/controllers/AuthController");
const authMiddleware = require("../app/middlewares/auth");

// newsControllers.index

// add Slug

router.get("/login", authController.renderLogin);
router.get("/register", authController.renderRegister);
router.post("/create", authController.create);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/:_id", authMiddleware.Checklogin, authController.renderMyProfile);

module.exports = router;
