
const User = require("../models/User");

async function verifyAdmin(req, res,next) {
  try {
    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      })
    }else if(user.role !== "admin"){
        return res.status(403).json({
          message: "This is not within your authority."
        })
      }
    
      next()

  } catch (err) {
    console.error(err)

    return res.status(500).json({
      message: "Internal Server Error"
    })
  }
}
async function verifyInstructor(req, res,next) {
  try {
    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      })
    }else if(user.role !== "instructor"){
        return res.status(403).json({
          message: "You are not authorized to do this."
        })
    }
      next()

  } catch (err) {
    console.error(err)

    return res.status(500).json({
      message: "Internal Server Error"
    })
  }
}

async function verifyStudent(req, res,next) {
  try {
    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      })
    }else if(user.role !== "student"){
        return res.status(403).json({
          message: "You are not authorized to do this."
        })
    }
      next()

  } catch (err) {
    console.error(err)

    return res.status(500).json({
      message: "Internal Server Error"
    })
  }
}

async function verifyInstructorOrAdimin(req, res,next) {
  try {
    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      })
    }else if(user.role == "student"){
        return res.status(403).json({
          message: "You are not authorized to do this."
        })
    }
      next()

  } catch (err) {
    console.error(err)

    return res.status(500).json({
      message: "Internal Server Error"
    })
  }
}
module.exports={
verifyAdmin,
verifyInstructor ,
verifyInstructorOrAdimin ,verifyStudent

}