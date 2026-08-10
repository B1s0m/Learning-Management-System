const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const Enrollment=require("../controllers/enrollment.controller")
const verifyRole=require("../middleware/verifyRole")



router.get("/enrollment",verifyToken,enrollment.getMyEnrollment)



router.delete("/enrollment/course/:Id",verifyToken,verifyRole.verifyAdmin,enrollment.getallEnrollmentCoures)

router.delete("/enrollment/:Id",verifyToken,verifyRole.verifyAdmin,enrollment.deleteenrollmentById)







module.exports = router;
