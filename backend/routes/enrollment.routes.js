const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const enrollment=require("../controllers/enrollment.controller")
const verifyRole=require("../middleware/verifyRole")



router.get("/", verifyToken, enrollment.getMyEnrollment)



router.delete("/course/:Id", verifyToken, verifyRole.verifyAdmin, enrollment.getallEnrollmentCoures)

router.delete("/:Id", verifyToken, verifyRole.verifyAdmin, enrollment.deletEnrollmentById)







module.exports = router;
