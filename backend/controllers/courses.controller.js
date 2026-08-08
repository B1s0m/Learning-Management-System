const Course = require("../models/Course");
const uploadToCloudinary = require("./uploadToCloudinary");
const cloudinary = require("../config/cloudinary");



async function createCourse(req, res) {

    try {
        req.body.instructor = req.user._id
        const { title, category, description, level, isPublished, price, discount, accessCode, accessCodeActive, instructor } = req.body

        let image = "";
        if (req.file) {
            const result = await uploadToCloudinary({
                fileBuffer: req.file.buffer, type: "image", foldername: "lms/courses"
            }
            );
            image = result.secure_url;

        }

        console.log(req.file);


        const createdCourse = await Course.create({ title, category, description, image, level, isPublished, price: Number(price), discount: Number(discount), accessCode, accessCodeActive, instructor })
        console.log(req.body);
        res.status(201).json(createdCourse);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }

}

async function getAllCourse(req, res) {

    try {

        const AllCourse = await Course.find()
        res.status(200).json(AllCourse);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }

}



async function getCourseById(req, res) {
    try {
        const foundCourse = await Course.findById(req.params.id)
        res.status(200).json(foundCourse);
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


async function updateCourseById(req, res) {
    try {
        const id = req.params.id
        const instructorid = req.user._id
        // console.log(instruct orid)
        const findCourse = await Course.findById(id)
        // console.log(req.body)
        if (String(instructorid) != String(findCourse.instructor)) {
            return res.status(403).json({
                message: "You are not authorized to update this course",
            });
        }

        let image = findCourse.image;

        if (req.file) {
            const result = await uploadToCloudinary({
                fileBuffer: req.file.buffer, type: "image", foldername: "lms/courses"
            }
            );



            if (findCourse.image) {
                const oldimagefilename = getPathFromUrl(findCourse.image)
                await cloudinary.uploader.destroy(oldimagefilename)
            }

            image = result.secure_url;

        }
        // console.log(req.file);


        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            discount: req.body.discount,
            level: req.body.level,
            category: req.body.category,
            image: image
        }, { new: true });
        // console.log(updatedCourse)
        res.json(updatedCourse);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
}


async function deleteCourseById(req, res) {
    try {

        const deleteCoursey = await Course.findByIdAndDelete(req.params.id);
        res.json(deleteCoursey);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
}


module.exports = {

    createCourse, getAllCourse, getCourseById, deleteCourseById, updateCourseById

}