const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const {verifyAdmin, verifyInstructor} =require("../middleware/verifyRole")
const {getSubmissionById, getSubmissionsByConditionsWithSelection, creatSubmission, updateSubmissionById, deleteSubmissionById} = require("../controllers/submission.controller")

router.get("/list",verifyToken, verifyInstructor, getSubmissionsByConditionsWithSelection)
router.get("/:id", getSubmissionById)
router.post("/", verifyToken, creatSubmission)
router.put("/:id", verifyToken, updateSubmissionById)
router.delete("/:id", verifyToken, deleteSubmissionById)

module.exports = router