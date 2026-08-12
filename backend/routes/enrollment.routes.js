const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const Enrollment=require("../controllers/enrollment.controller")
const verifyRole=require("../middleware/verifyRole")



router.get("/enrollment",verifyToken,Enrollment.getMyEnrollment)



router.delete("/enrollment/course/:id",verifyToken,Enrollment.getallEnrollmentCoures)

router.delete("/enrollment/:id",verifyToken,Enrollment.deletEnrollmentById)







module.exports = router;
