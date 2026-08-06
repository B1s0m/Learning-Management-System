const mongoose = require("mongoose")

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    instructions: {
      type: String
    },

    instructionPdf: {
      type: String,
      default: ""
    },

    dueDate: {
      type: Date,
      required: true
    },

    totalMarks: {
      type: Number,
      required: true,
      min: 0
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
  },{timestamps: true}
)

let Assignment = mongoose.model("Assignment", assignmentSchema)

module.exports = Assignment