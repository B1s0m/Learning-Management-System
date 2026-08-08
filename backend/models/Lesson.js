const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    content: {
      type: String
    },

    videoUrl: {
      type: String
    },

    pdfFile: {
      type: String
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },

    creactedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },{timestamps: true}
)

const Lesson=  mongoose.model("Lesson", lessonSchema)
module.exports =Lesson