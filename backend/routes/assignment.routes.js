const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const assignment=require("../controllers/assignment.controller")
const verifyRole=require("../middleware/verifyRole")
const upload=require("../middleware/upload")


// router.get("/assignments/:lessonid",verifyToken,courses.getAllCourse)

// router.get("/courses/:id",verifyToken,courses.getCourseById)

router.post("/assignments/:lessonid",upload.single("instructionsFile"), verifyToken,verifyRole.verifyInstructor,assignment.createAssignment )

// router.put("/courses/:id",upload.single("image"),verifyToken,verifyRole.verifyInstructor,courses.updateCourseById)

// router.delete("/courses/:id", verifyToken,verifyRole.verifyInstructor,courses.deleteCourseById)





module.exports = router;
