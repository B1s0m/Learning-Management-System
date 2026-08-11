const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const lesson=require("../controllers/lesson.controller")
const verifyRole=require("../middleware/verifyRole")
const upload=require("../middleware/upload")

// //// all user cae see
router.get("/lesson/couers/:couersid",verifyToken,lesson.getAllLesson)

router.get("/lesson/:id",verifyToken,lesson.getLessonById)

/// only instructor
router.post("/lesson/:id", upload.fields([
    { name: "videoUrl", maxCount: 1 },
    { name: "pdfFile", maxCount: 1 },
  ]),verifyToken,verifyRole.verifyInstructor,lesson.createLesson)

router.put("/lesson/:id",upload.fields([
    { name: "videoUrl", maxCount: 1 },
    { name: "pdfFile", maxCount: 1 },
  ]),verifyToken,verifyRole.verifyInstructor,lesson.updateLessonById)

router.delete("/lesson/:id", verifyToken,verifyRole.verifyInstructor,lesson.deleteLessonById)





module.exports = router;
