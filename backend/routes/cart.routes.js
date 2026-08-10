const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const Cart=require("../controllers/cart.controller")
const verifyRole=require("../middleware/verifyRole")

router.get("/cart",verifyToken,Cart.getAllCart)

router.post("/Cart/:Id",verifyToken,verifyRole.verifyAdmin,Cart.addCart)

router.post("/Cart",verifyToken,verifyRole.verifyAdmin,Cart.checkoutCart)


router.delete("/Cart/:Id",verifyToken,verifyRole.verifyAdmin,Cart.deleteCartById)

router.delete("/Cart/",verifyToken,verifyRole.verifyAdmin,Cart.deleteAllCart)





module.exports = router;
