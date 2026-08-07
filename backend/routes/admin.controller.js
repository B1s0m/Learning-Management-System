const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const Category=require("../controllers/Category.controller")

router.post("/category",Category.createCategory)

router.get("/category",Category.getAllCategory)

router.get("/category/:id",Category.getCategorytById)

router.put("/category/:id",Category.updateCategoryById)

router.delete("/category/:id",Category.deleteCategoryById)






module.exports = router;
