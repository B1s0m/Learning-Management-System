const Assignment = require("../models/Assignment")
const Submission = require("../models/Submission")
const uploadToCloudinary = require("./uploadToCloudinary");
const cloudinary = require("../config/cloudinary");
const Enrollment = require("../models/Enrollment");


async function getSubmissionById(req, res) {
    try {
        let thisSubmission = await Submission.findById(req.params.id)
        res.status(200).json(thisSubmission)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}
// مثال للاستدعاء
// http://localhost:3000/submissions/list?isActive=Online&role=student&selections=email
async function getSubmissionsByConditionsWithSelection(req, res) {
    try {
        // ياخد السلكشن من الكويري ويخلي الباقي في أوبجكت  اسمه فلتر
        let { selections, ...filter } = req.query
        let conditionSubmissions = await Submission.find(filter).select(selections)
        res.status(200).json(conditionSubmissions)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}

async function createSubmission(req, res) {
  try {
    if (req.user?.role !== "student") {
      return res.status(403).json({
        message: "You are not a student",
      });
    }

    const assignment = await Assignment.findById(
      req.params.assignmentId
    ).populate({
      path: "lesson",
      select: "course",
    });

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    const enrollment = await Enrollment.findOne({
      student: req.user._id,
      course: assignment.lesson.course,
    });

    if (!enrollment) {
      return res.status(403).json({
        message: "You do not have access to this course",
      });
    }

    if (new Date() > assignment.dueDate) {
      return res.status(400).json({
        message: "Assignment deadline has passed",
      });
    }

    const existingSubmission = await Submission.findOne({
      assignment: assignment._id,
      student: req.user._id,
    });

    if (existingSubmission) {
      return res.status(400).json({
        message: "You already submitted this assignment",
      });
    }

    let answers = [];

    if (req.body.answers) {
      answers = JSON.parse(req.body.answers);
    }

    for (const question of assignment.questions) {
      let answer = answers.find(
        (one) =>
          one.questionId?.toString() ===
          question._id.toString()
      );

      if (!answer) {
        answer = {
          questionId: question._id,
        };

        answers.push(answer);
      }

      if (question.questionType === "text") {
        if (!answer.textAnswer) {
          return res.status(400).json({
            message: `Text answer is required for ${question.questionText}`,
          });
        }
      }

      if (question.questionType === "multiple-choice") {
        if (!answer.selectedOption) {
          return res.status(400).json({
            message: `Select an option for ${question.questionText}`,
          });
        }

        if (!question.options.includes(answer.selectedOption)) {
          return res.status(400).json({
            message: "Invalid selected option",
          });
        }
      }

      if (question.questionType === "file") {
        const uploadedFile = req.files?.find(
          (file) =>
            file.fieldname === `file_${question._id}`
        );

        if (!uploadedFile) {
          return res.status(400).json({
            message: `PDF file is required for ${question.questionText}`,
          });
        }

        if (uploadedFile.mimetype !== "application/pdf") {
          return res.status(400).json({
            message: "Only PDF files are allowed",
          });
        }

        const result = await uploadToCloudinary({
          fileBuffer: uploadedFile.buffer,
          type: "raw",
          foldername: "lms/submissions",
          filename: `${Date.now()}-${uploadedFile.originalname}`,
        });

        answer.file = result.secure_url;
      }
    }

    const createdSubmission = await Submission.create({
      assignment: assignment._id,
      student: req.user._id,
      answers,
    });

    return res.status(201).json(createdSubmission);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error.message,
    });
  }
}

async function updateSubmissionById(req, res) {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found",
      });
    }

    // Only the student who created the submission can update it
    if (submission.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to update this submission",
      });
    }

    const assignment = await Assignment.findById(submission.assignment);

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    // Student cannot edit after due date
    if (new Date() > assignment.dueDate) {
      return res.status(400).json({
        message: "Assignment deadline has passed",
      });
    }

    let answers = submission.answers;

    // form-data sends answers as string
    if (req.body.answers) {
      const newAnswers = JSON.parse(req.body.answers);

      for (const newAnswer of newAnswers) {
        const question = assignment.questions.id(newAnswer.questionId);

        if (!question) {
          return res.status(400).json({
            message: "Invalid questionId",
          });
        }

        const oldAnswer = answers.find(
          (answer) =>
            answer.questionId.toString() === newAnswer.questionId.toString()
        );

        if (!oldAnswer) {
          return res.status(400).json({
            message: "Answer not found",
          });
        }

        if (question.questionType === "text") {
          oldAnswer.textAnswer = newAnswer.textAnswer;
        }

        if (question.questionType === "multiple-choice") {
          if (!question.options.includes(newAnswer.selectedOption)) {
            return res.status(400).json({
              message: "Invalid selected option",
            });
          }

          oldAnswer.selectedOption = newAnswer.selectedOption;
        }
      }
    }

    // Replace uploaded PDF answers
    if (req.files) {
      for (const file of req.files) {
        const questionId = file.fieldname.replace("file_", "");

        const question = assignment.questions.id(questionId);

        if (!question) {
          return res.status(400).json({
            message: "Invalid questionId for uploaded file",
          });
        }

        if (question.questionType !== "file") {
          return res.status(400).json({
            message: "This question does not accept a file",
          });
        }

        if (file.mimetype !== "application/pdf") {
          return res.status(400).json({
            message: "Only PDF files are allowed",
          });
        }

        const answer = answers.find(
          (answer) =>
            answer.questionId.toString() === questionId.toString()
        );

        if (!answer) {
          return res.status(400).json({
            message: "Answer not found",
          });
        }

        const result = await uploadToCloudinary({
          fileBuffer: file.buffer,
          type: "raw",
          foldername: "lms/submissions",
          filename: `${Date.now()}-${file.originalname}`,
        });

        answer.file = result.secure_url;
      }
    }

    await submission.save();

    return res.status(200).json(submission);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error.message,
    });
  }
}

async function deleteSubmissionById(req, res) {
    try {
        let thisSubmission = await Submission.findById(req.params.id).populate("student")
        let Submissionstudentname = thisSubmission.student.username
        if (req.user?._id == String(thisSubmission.student._id)) {
            let deletedSubmission = await Submission.findByIdAndDelete(req.params.id)
            return res.status(200).json({ message: `${Submissionstudentname} Submission Has Been Deleted Seccessfully` })
        } else {
            return res.status(403).json({ message: "You are not authorized to delete this Submission" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}

module.exports = {
    getSubmissionById, getSubmissionsByConditionsWithSelection, createSubmission, updateSubmissionById, deleteSubmissionById
}