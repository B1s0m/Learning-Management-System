const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const {verifyAdmin, verifyInstructor} =require("../middleware/verifyRole")
const {getUserById, getUsersByConditionsWithSelection, updateUserById, deleteUserById} = require("../controllers/user.controller")

router.get("/list",verifyToken, verifyAdmin, getUsersByConditionsWithSelection)
router.get("/:id", getUserById)
router.put("/:id", verifyToken, updateUserById)
router.delete("/:id", verifyToken, deleteUserById)

module.exports = router