const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course")



async function getMyEnrollment(req, res) {
  try {
    const userId = req.user._id
    if (req.user.role === "instructor") {
      const myCourses = await Course.find({ instructor: userId })
        .populate([
          { path: "category", select: "name" },
          { path: "instructor", select: "username" }
        ])

      return res.status(200).json(myCourses)
    }
    const AllEnrollment = await Enrollment.find({ student: userId }).populate([
      {
        path: "course",
        select: "title category instructor price",
        populate: [
          { path: "category", select: "name" },
          { path: "instructor", select: "username" }
        ]
      }
    ])
    const myCourses = AllEnrollment.map(enrollment => enrollment.course)

    res.status(200).json(myCourses)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error })
  }
}

async function getallEnrollmentCoures(req, res) {

    try {
        const course = req.params._id
        const AllEnrollmentCoures = await Enrollment.find({ course })
        res.status(200).json(AllEnrollmentCoures);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }

}



async function deletEnrollmentById(req, res) {
    try {

        const deleteEnrollment = await Cart.findByIdAndDelete(req.params.id);
        res.json(deleteEnrollment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
}


module.exports = {

    deletEnrollmentById, getMyEnrollment, getallEnrollmentCoures, deletEnrollmentById

}