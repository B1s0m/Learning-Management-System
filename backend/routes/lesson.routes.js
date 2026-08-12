const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const lesson=require("../controllers/lesson.controller")
const verifyRole=require("../middleware/verifyRole")
const upload=require("../middleware/upload")

// //// all user cae see
router.get("/all/:courseId",verifyToken,lesson.getAllLesson)

router.get("/:id",verifyToken,lesson.getLessonById)

/// only instructor
router.post("/",   upload.fields([
    { name: "videoUrl", maxCount: 1 },
    { name: "pdfFile", maxCount: 1 },
  ]),verifyToken,verifyRole.verifyInstructor,lesson.createLesson)

router.put("/:id",upload.fields([
    { name: "videoUrl", maxCount: 1 },
    { name: "pdfFile", maxCount: 1 },
  ]),verifyToken,verifyRole.verifyInstructor,lesson.updateLessonById)

router.delete("/:id", verifyToken,verifyRole.verifyInstructor,lesson.deleteLessonById)





module.exports = router;
