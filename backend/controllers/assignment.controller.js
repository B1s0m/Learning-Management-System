const Assignment = require("../models/Assignment")
const uploadToCloudinary = require("./uploadToCloudinary");
const cloudinary = require("../config/cloudinary");
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

        // console.log(req.file);

        //this for test postman
        const questions = JSON.parse(req.body.questions);


        const lesson = req.params.lessonid
        const {
            title,
            instructions,
            dueDate
            // questions     
        } = req.body
        const createdassignment = await Assignment.create({ title, instructions, dueDate, questions, lesson })
        res.status(201).json(createdassignment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }

}


async function getAllAssignment(req, res) {

    try {
        const courseid = req.params.courseid
        const getalllesson = await Lesson.find({ course: courseid }).select("_id")

        const AllAssignment = await Assignment.find({
            lesson: { $in: getalllesson }
        })

        res.status(200).json(AllAssignment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
}
async function getLessonAssignments(req, res){
        try {
            const lessonId = req.params.lessonId
            const allAssignments = await Assignment.find({lesson: lessonId}).select("title questions dueDate")
            res.status(200).json(allAssignments)
        } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }

}

async function getAssignmentById(req, res) {
    try {
        const assignmentid = req.params.id
        const foundassignment = await Assignment.findById(assignmentid).populate("lesson", "title creactedBy")
        res.status(200).json(foundassignment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
}

function getPathFromUrl(Path) {
    const parts = Path.split("/");

    // this for get last string in aray (filename.ext) 
    const fileName = parts[parts.length - 1];

    // remove Extension 
    const fileNameWithoutExt = fileName.split(".")[0];

    return `lms/Assignment/${fileNameWithoutExt}`;
}

async function updateAssignmentById(req, res) {
    try {


        const id = req.params.id
        const creactedBy = req.user._id
        const findAssignment = await Assignment.findById(id).populate("lesson")


        if (!findAssignment) {
            return res.status(404).json({
                message: "Assignment not found",
            });
        }


        if (creactedBy != String(findAssignment.lesson.creactedBy)) {
            return res.status(403).json({
                message: "You are not authorized to update this Assignment",
            });
        }

        let instructionsFile = findAssignment.instructionsFile

        if (req.file) {
            const result = await uploadToCloudinary({
                fileBuffer: req.file.buffer, type: "raw", foldername: "lms/Assignment"
                , filename: req.file.originalname
            });

            if (instructionsFile) {
                const oldimagefilename = getPathFromUrl(instructionsFile)
                await cloudinary.uploader.destroy(oldimagefilename)
            }

            instructionsFile = result.secure_url;

        }



        /// add questions
        const questions = JSON.parse(req.body.questions);
        const { title, instructions, dueDate } = req.body
          

        const updatedAssignment = await Assignment.findByIdAndUpdate(id,{
            title,
            instructions,
            dueDate,
            instructionsFile, questions }
            , { new: true });
        res.json(updatedAssignment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
}


async function deleteAssignmentById(req, res) {
    try {

        const id = req.params.id
        const creactedBy = req.user._id
        const findAssignment = await Assignment.findById(id).populate("lesson")


        if (!findAssignment) {
            return res.status(404).json({
                message: "Assignment not found",
            });
        }


        if (creactedBy != String(findAssignment.lesson.creactedBy)) {
            return res.status(403).json({
                message: "You are not authorized to delete this Assignment",
            });
        }

        const deleteAssignment = await Assignment.findByIdAndDelete(id);
        res.json(deleteAssignment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
}







module.exports = {
    createAssignment, getAllAssignment, getAssignmentById, deleteAssignmentById, updateAssignmentById, getLessonAssignments


}