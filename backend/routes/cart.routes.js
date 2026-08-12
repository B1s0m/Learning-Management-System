const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const {getCartsByConditionsWithSelection, creatCart, deleteCartById, deleteAllCart, checkoutCart} = require("../controllers/cart.controller")
const {verifyAdmin, verifyInstructor,verifyStudent} = require("../middleware/verifyRole")

router.get("/", verifyToken, getCartsByConditionsWithSelection)

router.post("/checkout", verifyToken, verifyStudent, checkoutCart)

router.post("/add/:id", verifyToken, verifyStudent, creatCart)


router.delete("/:courseId", verifyToken, verifyStudent, deleteCartById)

router.delete("/allCart/:id", verifyToken, verifyStudent, deleteAllCart)





module.exports = router;
