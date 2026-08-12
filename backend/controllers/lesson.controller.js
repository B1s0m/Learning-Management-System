const Lesson = require("../models/Lesson");
const uploadToCloudinary = require("./uploadToCloudinary");
const cloudinary = require("../config/cloudinary");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course")

async function createLesson(req, res) {

    try {
        /// const course=req.params.couersid
        req.body.creactedBy = req.user._id
        const { title, content, creactedBy, course } = req.body

        let videoUrl = null;
        const video = req.files.videoUrl[0]
        if (video) {
            const result = await uploadToCloudinary({
                fileBuffer: req.files.videoUrl[0].buffer,
                type: "video",
                foldername: "lms/lesson/video",
                //   filename:null
            }
            );
            videoUrl = result.secure_url;

        }
        let = null;
        const pdf = req.files.pdfFile[0]
        if (pdf) {
            const result = await uploadToCloudinary({
                fileBuffer: req.files.pdfFile[0].buffer,
                type: "raw",
                foldername: "lms/lesson/file",
                filename: req.files.pdfFile[0].originalname
            }
            );
            pdfFile = result.secure_url;

        }
        // console.log(req.files.pdfFile[0].originalname);

        // console.log(req.files.videoUrl[0].originalname);
        // console.log(videoUrl);
        // console.log("-------------------------------------");
        // console.log(pdfFile);
        // console.log("-------------------------------------");
        // console.log(req.files);


        const createdLesson = await Lesson.create({ title, content, creactedBy, course, pdfFile, videoUrl })
        console.log(req.body);
        res.status(201).json(createdLesson);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }

}


async function getAllLesson(req, res) {
    try {
        const { courseId } = req.params
        const enrollment = await Enrollment.findOne({ student: req.user._id, course: courseId })
        const isInstructor = await Course.findOne({ _id: courseId, instructor: req.user._id })
        if (enrollment || isInstructor) {
            const allLessons = await Lesson.find({ course: courseId }).populate([
                { path: "course", select: "title" },
                { path: "creactedBy", select: "username" }
            ])
            return res.status(200).json(allLessons)

        } else {
            return res.status(403).json({ message: "You Are Not In The Course And You Are Not the Creator Of This Course" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}

async function getLessonById(req, res) {
    try {
        const foundLesson = await Lesson.findById(req.params.id)
        res.status(200).json(foundLesson);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
}


async function deleteLessonById(req, res) {
    try {

        const id = req.params.id
        const creactedBy = req.user._id
        const findLesson = await Lesson.findById(id)
        if (creactedBy != String(findLesson.creactedBy)) {
            return res.status(403).json({
                message: "You are not authorized to update this Lesson",
            });
        }
        const deleteLesson = await Lesson.findByIdAndDelete(id);
        res.json(deleteLesson);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
}


// this function get path file
function getPathFromUrlvideo(Path) {
    const parts = Path.split("/");

    // this for get last string in aray (filename.ext) 
    const fileName = parts[parts.length - 1];

    // remove Extension 
    const fileNameWithoutExt = fileName.split(".")[0];

    return `lms/lesson/video/"${fileNameWithoutExt}`;
}
function getPathFromUrlpdf(Path) {
    const parts = Path.split("/");

    // this for get last string in aray (filename.ext) 
    const fileName = parts[parts.length - 1];

    // remove Extension 
    const fileNameWithoutExt = fileName.split(".")[0];

    return `lms/lesson/file/"${fileNameWithoutExt}`;
}


async function updateLessonById(req, res) {
    try {
        const id = req.params.id
        const creactedBy = req.user._id
        // console.log(instruct orid)
        const findLesson = await Lesson.findById(id)
        // console.log(req.body)
        if (creactedBy != String(findLesson.creactedBy)) {
            return res.status(403).json({
                message: "You are not authorized to update this Lesson",
            });
        }
        //////  this for filepdf
        let pdfFile = findLesson.videoUrl;
        const pdf = req.files.pdfFile[0]

        if (pdf) {
            const result = await uploadToCloudinary({
                fileBuffer: pdf.buffer, type: "raw", foldername: "lms/lesson/file"
            }
            );



            if (pdfFile) {
                const oldimagefilename = getPathFromUrlpdf(pdfFile)
                await cloudinary.uploader.destroy(oldimagefilename)
            }

            pdfFile = result.secure_url;

        }
        //////  this for videoURL
        let videoUrl = findLesson.videoUrl;
        const video = req.files.videoUrl[0]

        if (video) {
            const result = await uploadToCloudinary({
                fileBuffer: video.buffer, type: "video", foldername: "lms/lesson/video"
            }
            );



            if (videoUrl) {
                const oldimagefilename = getPathFromUrlvideo(videoUrl)
                await cloudinary.uploader.destroy(oldimagefilename)
            }

            videoUrl = result.secure_url;

        }
        const { title, content, } = req.body
        const updatedLesson = await Lesson.findByIdAndUpdate(req.params.id,
            {
                title,
                content,
                pdfFile,
                videoUrl,
            }, { new: true });
        // console.log(updatedLesson)
        res.json(updatedLesson);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
}





module.exports = {
    createLesson, getAllLesson, getLessonById, deleteLessonById, updateLessonById
}