const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const assignment=require("../controllers/assignment.controller")
const verifyRole=require("../middleware/verifyRole")
const upload=require("../middleware/upload")


router.get("/all/:courseid",verifyToken, assignment.getAllAssignment )

router.get("/:id",verifyToken, assignment.getAssignmentById )

router.get("lesson/:lessonId", verifyToken, assignment.getLessonAssignments)

router.post("/lesson/:lessonid", upload.single("instructionsFile") , verifyToken ,verifyRole.verifyInstructor ,assignment.createAssignment )

router.put("/:id",upload.single("instructionsFile"),verifyToken, verifyRole.verifyInstructor ,assignment.updateAssignmentById)

router.delete("/:id", verifyToken, verifyRole.verifyInstructor, assignment.deleteAssignmentById)


module.exports = router;