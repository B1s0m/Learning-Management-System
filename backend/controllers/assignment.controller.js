const Assignment = require("../models/Assignment")
const uploadToCloudinary = require("./uploadToCloudinary");
const cloudinary = require("../config/cloudinary");
const Course = require("../models/Course");
const Lesson = require("../models/Lesson");



async function createAssignment(req, res) {

    try {
        let instructionsFile = null;
        if (req.file) {
            const result = await uploadToCloudinary({
                fileBuffer: req.file.buffer, type: "raw", foldername: "lms/Assignment"
                , filename: req.file.originalname
            }
            );
            instructionsFile = result.secure_url;

        }

        console.log(req.file);
        const questions = JSON.parse(req.body.questions);


        const lesson = req.params.lessonid
        const { title, instructions, dueDate } = req.body
        const createdassignment = await Assignment.create({ title, instructions, dueDate, questions, lesson ,instructionsFile })
        res.status(201).json(createdassignment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }

}


async function getAllAssignment(req, res) {

    try { 
        const courseid=req.params.courseid
         const getalllesson= await Lesson.find({course:courseid}).select("_id")
          
         const AllAssignment= await Assignment.find({
            lesson :{$in:getalllesson }
         })
        
        res.status(200).json(AllAssignment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }

}



async function getAssignmentById(req, res) {
    try {
        const foundassignment = await Assignment.findById(req.params.id)
        res.status(200).json(foundassignment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
}



// async function updateAssignmentById(req, res) {
//     try {

//         const updatedAssignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, {new: true});
//         res.json(updatedAssignment);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: error })
//     }
// }


async function deleteAssignmentById(req, res) {
    try {

        const deleteAssignment = await Assignment.findByIdAndDelete(req.params.id);
        res.json(deleteAssignment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
}







module.exports = {
    createAssignment ,getAllAssignment ,getAssignmentById


}