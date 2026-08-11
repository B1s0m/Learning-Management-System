const mongoose = require("mongoose")

const enrollmentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    }

     ,accessType: {
       type: String,
      enum: ["purchase", "code"],
      required: true,
    },
      amount: {
      type: Number,
      min: 0,
    },
  },{timestamps: true}
)

let Enrollment = mongoose.model("Enrollment", enrollmentSchema)
module.exports = Enrollment