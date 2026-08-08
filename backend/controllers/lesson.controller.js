const Lesson = require("../models/Lesson");
const uploadToCloudinary = require("./uploadToCloudinary");
const cloudinary = require("../config/cloudinary");



async function createLesson(req, res) {

    try {
        req.body.creactedBy = req.user._id
        const { title, content, creactedBy, course } = req.body

        let videoUrl = null;
        const video=  req.files.videoUrl[0]  
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
        let pdfFile = null;
        const pdf =req.files.pdfFile[0]
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


        const createdLesson = await Lesson.create({ title, content, creactedBy,course,pdfFile,videoUrl  })
        console.log(req.body);
        res.status(201).json(createdLesson);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }

}


async function getAllLesson(req, res) {

    try {

        const AllLesson = await Lesson.find()
        res.status(200).json(AllLesson);
    } catch (error) {
        console.log(error);
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

        const deleteLesson = await Lesson.findByIdAndDelete(req.params.id);
        res.json(deleteLesson);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
}


// this function get path file
function getPathFromUrl(Path) {
    const parts = Path.split("/");

    // this for get last string in aray (filename.ext) 
    const fileName = parts[parts.length - 1];

    // remove Extension 
    const fileNameWithoutExt = fileName.split(".")[0];

    return `lms/courses/${fileNameWithoutExt}`;
}


async function updateLessonById(req, res) {
    try {
        const id = req.params.id
        const instructorid = req.user._id
        // console.log(instruct orid)
        const findLesson = await Lesson.findById(id)
        // console.log(req.body)
        if (String(instructorid) != String(findLesson.instructor)) {
            return res.status(403).json({
                message: "You are not authorized to update this Lesson",
            });
        }

        let image = findLesson.image;

        if (req.file) {
            const result = await uploadToCloudinary({
                fileBuffer: req.file.buffer, type: "image", foldername: "lms/courses"
            }
            );



            if (findLesson.image) {
                const oldimagefilename = getPathFromUrl(findLesson.image)
                await cloudinary.uploader.destroy(oldimagefilename)
            }

            image = result.secure_url;

        }
        // console.log(req.file);


        const updatedLesson = await Lesson.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            discount: req.body.discount,
            level: req.body.level,
            category: req.body.category,
            image: image
        }, { new: true });
        // console.log(updatedLesson)
        res.json(updatedLesson);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
}





module.exports = {
    createLesson ,getAllLesson ,getLessonById ,deleteLessonById
}