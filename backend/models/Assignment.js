const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema({
   questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },

  questionType: {
    type: String,
    enum: ["text", "multiple-choice", "file"],
    required: true,
  },

  options: [
    {
      type: String,
    },
  ],

  correctAnswer: {
    type: String,
  },

  marks: {
    type: Number,
    required: true,
    min: 1,
  },
});

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
    instructionsFile: {
      type: String,
    },

    questions: [questionSchema],

    dueDate: {
      type: Date,
      required: true
    },


    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true
    },

  }, { timestamps: true }
)

let Assignment = mongoose.model("Assignment", assignmentSchema)

module.exports = Assignment


