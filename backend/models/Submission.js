const mongoose = require("mongoose")


const answerSchema = new mongoose.Schema({
    questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  textAnswer: {
    type: String,
  },

  selectedOption: {
    type: String,
  },

  file: {
    type: String,
  },

  marksAwarded: {
    type: Number,
    default: null,
    min: 0,
  },

  feedback: {
    type: String,
  },
});



const submissionSchema = new mongoose.Schema(
  {
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    answers: [answerSchema],

    submittedAt: {
      type: Date,
      default: Date.now,
    }
  },
  {
    timestamps: true,
  }
);


const  Submission =mongoose.model("Submission", submissionSchema);
module.exports = Submission
