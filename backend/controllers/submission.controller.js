const Assignment = require("../models/Assignment")
const Cart = require("../models/Cart")
const Submission = require("../models/Submission")

async function getSubmissionById(req, res) {
    try {
        let thisSubmission = await Submission.findById(req.params.id)
        res.status(200).json(thisSubmission)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}
// مثال للاستدعاء
// http://localhost:3000/submissions/list?isActive=Online&role=student&selections=email
async function getSubmissionsByConditionsWithSelection(req, res) {
    try {
        // ياخد السلكشن من الكويري ويخلي الباقي في أوبجكت  اسمه فلتر
        let { selections, ...filter } = req.query
        let conditionSubmissions = await Submission.find(filter).select(selections)
        res.status(200).json(conditionSubmissions)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}
async function creatSubmission(req, res) {
    try {
        if (req.user?.role == "student") {
            // هذا شرط تحقق أن هالطالب مسجل في هالكورس عشان يكون مسموح له بالتسليم
            const assignment = await Assignment.findById(req.params.assignmentId).populate('lesson','course')
            const cart = await Cart.findOne({student:req.user._id})
            const filteredCart = cart.items.filter((item)=>{
                return item.course === assignment.lesson.course
            })
            if(filteredCart.length === 0){
                return res.status(403).json({message: "You are not in this course"})
            }
           
            let thisAnswers = req.body.answers
            let createdSubmission = await Submission.create({
                assignment: req.params.submissionID,
                student: req.user._id,
                answers: req.body.answers
            })
        } else {
            return res.status(403).json({ message: "You Are Not A Student!!" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}
async function updateSubmissionById(req, res) {
    try {
        let thisSubmission = await Submission.findById(req.params.id).populate({
            path: "assignment",
            populate: {
                path: "lesson"
            }
        })
        if (req.user._id == String(thisSubmission.student) && thisSubmission.assignment.dueDate.gitTime() > Date.now.gitTime()) {
            let thisAnswers = req.body.answers
            let updatedSubmission = await Submission.findByIdAndUpdate(req.params.id, { answers: [...answers, thisAnswers] }, { new: true })
            return res.status(200).json(updatedSubmission)
        } else if (req.user._id == String(thisSubmission.assignment.lesson.creactedBy)) {
            let Marks = req.body.marksAwarded
            let Feedback = req.body.feedback
            for (let i = 0; i < thisSubmission.answers.length; i++) {
                thisSubmission.answers[i].marksAwarded = Marks[i]
                thisSubmission.answers[i].feedback = Feedback[i]
            }
            thisSubmission.save()
            return res.status(200).json(thisSubmission)
            // let updatedSubmissionMarks = Submission.findByIdAndUpdate(req.params.id, {answers: [...answers]}, {new: true})
        } else {
            return res.status(403).json({ message: "You are not authorized or to late to update this Submission" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}
async function deleteSubmissionById(req, res) {
    try {
        let thisSubmission = await Submission.findById(req.params.id).populate("student")
        let Submissionstudentname = thisSubmission.student.username
        if (req.user?._id == String(thisSubmission.student._id)) {
            let deletedSubmission = await Submission.findByIdAndDelete(req.params.id)
            return res.status(200).json({ message: `${Submissionstudentname} Submission Has Been Deleted Seccessfully` })
        } else {
            return res.status(403).json({ message: "You are not authorized to delete this Submission" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}

module.exports = {
    getSubmissionById, getSubmissionsByConditionsWithSelection, creatSubmission, updateSubmissionById, deleteSubmissionById
}