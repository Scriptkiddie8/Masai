const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/recipeController");

router.get("/cuisine/italian", ctrl.getItalianRecipes);
router.get("/quick", ctrl.getQuickRecipes);
router.get("/expensive", ctrl.getExpensiveRecipes);
router.get("/sorted/price", ctrl.getRecipesSortedByPrice);
router.put("/update/biryani-price", ctrl.updateBiryaniPrice);

module.exports = router;
