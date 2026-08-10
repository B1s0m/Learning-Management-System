const Enrollment = require("../models/Enrollment");




async function getMyEnrollment(req, res) {

    try {
          const student = req.user._id
        const AllEnrollment = await Enrollment.find({student})
        res.status(200).json(AllEnrollment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }

}

async function getallEnrollmentCoures(req, res) {

    try {
          const course = req.params._id
        const AllEnrollmentCoures = await Enrollment.find({course})
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

    deletEnrollmentById,getMyEnrollment ,getallEnrollmentCoures

}