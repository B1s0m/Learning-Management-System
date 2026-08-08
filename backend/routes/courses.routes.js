const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const courses=require("../controllers/courses.controller")
const verifyRole=require("../middleware/verifyRole")
const upload=require("../middleware/upload")
// //// all user cae see
router.get("/courses",verifyToken,courses.getAllCourse)

router.get("/courses/:id",verifyToken,courses.getCourseById)

/// only instructor
router.post("/courses",  upload.single("image"),verifyToken,verifyRole.verifyInstructor,courses.createCourse)

router.put("/courses/:id",upload.single("image"),verifyToken,verifyRole.verifyInstructor,courses.updateCourseById)

router.delete("/courses/:id", verifyToken,verifyRole.verifyInstructor,courses.deleteCourseById)





module.exports = router;
