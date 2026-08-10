const mongoose = require("mongoose")

// const submissionSchema = new mongoose.Schema(
//   {
//     assignment: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Assignment",
//       required: true
//     },

//     student: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true
//     },

//     textAnswer: {
//       type: String
//     },

//     submissionFile: {
//       type: String
//     },

//     externalLink: {
//       type: String
//     },

//     grade: {
//       type: Number,
//       min: 0
//     },

//     feedback: {
//       type: String
//     },

//     submittedAt: {
//       type: Date,
//       default: Date.now
//     },

//     gradedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User"
//     },
//   },{timestamps: true}
// )


// const  Submission =mongoose.model("Submission", submissionSchema);
// module.exports = Submission



////////////////////////////


const answerSchema = new mongoose.Schema({
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
