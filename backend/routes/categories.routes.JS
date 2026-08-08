const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const Category=require("../controllers/Category.controller")
const verifyRole=require("../middleware/verifyRole")

//// all user cae see
router.get("/categories",verifyToken,Category.getAllCategory)

router.get("/categories/:id",verifyToken,Category.getCategorytById)

/// only admin
router.post("/categories",verifyToken,verifyRole.verifyAdmin,Category.createCategory)

router.put("/categories/:id",verifyToken,verifyRole.verifyAdmin,Category.updateCategoryById)

router.delete("/categories/:id",verifyToken,verifyRole.verifyAdmin,Category.deleteCategoryById)





module.exports = router;
