const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const {getCartsByConditionsWithSelection, creatCart, deleteCartById, deleteAllCart, checkoutCart} = require("../controllers/cart.controller")
const {verifyAdmin, verifyInstructor} = require("../middleware/verifyRole")

router.get("/", verifyToken, getCartsByConditionsWithSelection)

router.post("/:Id", verifyToken, verifyAdmin, creatCart)

router.post("/", verifyToken, verifyAdmin, checkoutCart)

router.delete("/:Id", verifyToken, verifyAdmin, deleteCartById)

router.delete("/allCart/:id", verifyToken, verifyAdmin, deleteAllCart)





module.exports = router;
