const express = require("express");
const router = express.Router();

const meController = require("../app/controllers/MeController");

// newsControllers.index

// add Slug

router.get("/stored/products", meController.storedProducts);
router.get("/profile", meController.profile);
router.get("/admin", meController.renderAdminPage);

module.exports = router;
