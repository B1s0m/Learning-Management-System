const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const {verifyAdmin, verifyInstructor} =require("../middleware/verifyRole")
const {getSubmissionById, getSubmissionsByConditionsWithSelection, createSubmission, updateSubmissionById, deleteSubmissionById} = require("../controllers/submission.controller")
const upload=require("../middleware/upload")
router.get("/list",verifyToken, verifyInstructor, getSubmissionsByConditionsWithSelection)
router.get("/:id", getSubmissionById)
router.post("/:assignmentId", verifyToken,  upload.any(), createSubmission)
router.put("/:id", verifyToken, upload.any(), updateSubmissionById)
router.delete("/:id", verifyToken, deleteSubmissionById)

module.exports = router