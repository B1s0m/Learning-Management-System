const mongoose = require("mongoose")

const submissionSchema = new mongoose.Schema(
  {
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    textAnswer: {
      type: String
    },

    submissionFile: {
      type: String
    },

    externalLink: {
      type: String
    },

    grade: {
      type: Number,
      min: 0
    },

    feedback: {
      type: String
    },

    submittedAt: {
      type: Date,
      default: Date.now
    },

    gradedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
  },{timestamps: true}
)



module.exports = mongoose.model("Submission", submissionSchema)