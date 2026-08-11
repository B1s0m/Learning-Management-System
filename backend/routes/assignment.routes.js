const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const assignment=require("../controllers/assignment.controller")
const verifyRole=require("../middleware/verifyRole")
const upload=require("../middleware/upload")


router.get("/assignments/all/:courseid",verifyToken, assignment.getAllAssignment )

router.get("/assignments/:id",verifyToken, assignment.getAssignmentById )

router.post("/assignments/lesson/:lessonid", upload.single("instructionsFile") , verifyToken ,verifyRole.verifyInstructor ,assignment.createAssignment )

router.put("/assignments/:id",upload.single("instructionsFile"),verifyToken, verifyRole.verifyInstructor ,assignment.updateAssignmentById)

router.delete("/assignments/:id", verifyToken, verifyRole.verifyInstructor, assignment.deleteAssignmentById)





module.exports = router;
