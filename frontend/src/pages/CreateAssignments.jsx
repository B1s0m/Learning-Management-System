import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { createAssignment } from "../services/functions/lesson";
import "../components/css/CreateAssignments.css";

const CreateAssignments = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    instructions: "",
    instructionsFile: null,
    dueDate: "",

    questions: [
      {
        questionText: "",
        questionType: "text",
        options: [],
        correctAnswer: "",
        marks: 1,
      },
    ],
  });

  function handleChange(event) {
    const { name, value, files } = event.target;

    if (name === "instructionsFile") {
      setFormData({
        ...formData,
        instructionsFile: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  }

  function handleQuestionChange(index, event) {
    const { name, value } = event.target;

    const updatedQuestions = [...formData.questions];

    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [name]: name === "marks" ? Number(value) : value,
    };

    setFormData({
      ...formData,
      questions: updatedQuestions,
    });
  }

  function handleOptionChange(questionIndex, optionIndex, value) {
    const updatedQuestions = [...formData.questions];

    const updatedOptions = [
      ...updatedQuestions[questionIndex].options,
    ];

    updatedOptions[optionIndex] = value;

    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      options: updatedOptions,
    };

    setFormData({
      ...formData,
      questions: updatedQuestions,
    });
  }

  function addOption(questionIndex) {
    const updatedQuestions = [...formData.questions];

    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      options: [
        ...updatedQuestions[questionIndex].options,
        "",
      ],
    };

    setFormData({
      ...formData,
      questions: updatedQuestions,
    });
  }

  function removeOption(questionIndex, optionIndex) {
    const updatedQuestions = [...formData.questions];

    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      options: updatedQuestions[questionIndex].options.filter(
        (_, index) => index !== optionIndex
      ),
    };

    setFormData({
      ...formData,
      questions: updatedQuestions,
    });
  }

  function addQuestion() {
    setFormData({
      ...formData,

      questions: [
        ...formData.questions,
        {
          questionText: "",
          questionType: "text",
          options: [],
          correctAnswer: "",
          marks: 1,
        },
      ],
    });
  }

  function removeQuestion(index) {
    const updatedQuestions = formData.questions.filter(
      (_, questionIndex) => questionIndex !== index
    );

    setFormData({
      ...formData,
      questions: updatedQuestions,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("instructions", formData.instructions);
      data.append("dueDate", formData.dueDate);
      data.append("lesson", lessonId);

      data.append(
        "questions",
        JSON.stringify(formData.questions)
      );

      if (formData.instructionsFile) {
        data.append(
          "instructionsFile",
          formData.instructionsFile
        );
      }

      await createAssignment(lessonId,data);

      navigate("/lessons/"+lessonId);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="create-assignment-page">

      <div className="create-assignment-header">
        <h1>Create Assignment</h1>
        <p>Create questions and set a due date.</p>
      </div>

      <form
        className="assignment-form"
        onSubmit={handleSubmit}
      >

        <div className="assignment-main-card">

          <div className="form-group">
            <label>Assignment Title</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter assignment title"
              required
            />
          </div>


          <div className="form-group">
            <label>Instructions</label>

            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              placeholder="Enter assignment instructions"
              rows="5"
            />
          </div>


          <div className="form-group">
            <label>Instructions PDF</label>

            <input
              type="file"
              name="instructionsFile"
              accept="application/pdf"
              onChange={handleChange}
            />
          </div>


          <div className="form-group">
            <label>Due Date</label>

            <input
              type="datetime-local"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </div>

        </div>


        <div className="questions-title">
          <h2>Questions</h2>

          <button
            type="button"
            className="add-question-btn"
            onClick={addQuestion}
          >
            + Add Question
          </button>
        </div>


        {formData.questions.map((question, questionIndex) => (

          <div
            className="create-question-card"
            key={questionIndex}
          >

            <div className="question-card-header">
              <h3>
                Question {questionIndex + 1}
              </h3>

              {formData.questions.length > 1 && (
                <button
                  type="button"
                  className="remove-question-btn"
                  onClick={() =>
                    removeQuestion(questionIndex)
                  }
                >
                  Remove
                </button>
              )}
            </div>


            <div className="form-group">
              <label>Question</label>

              <input
                type="text"
                name="questionText"
                value={question.questionText}
                onChange={(event) =>
                  handleQuestionChange(
                    questionIndex,
                    event
                  )
                }
                placeholder="Enter question"
                required
              />
            </div>


            <div className="question-row">

              <div className="form-group">
                <label>Question Type</label>

                <select
                  name="questionType"
                  value={question.questionType}
                  onChange={(event) =>
                    handleQuestionChange(
                      questionIndex,
                      event
                    )
                  }
                >
                  <option value="text">
                    Text
                  </option>

                  <option value="multiple-choice">
                    Multiple Choice
                  </option>

                  <option value="file">
                    File Upload
                  </option>
                </select>
              </div>


              <div className="form-group">
                <label>Marks</label>

                <input
                  type="number"
                  name="marks"
                  min="1"
                  value={question.marks}
                  onChange={(event) =>
                    handleQuestionChange(
                      questionIndex,
                      event
                    )
                  }
                  required
                />
              </div>

            </div>


            {question.questionType ===
              "multiple-choice" && (
              <div className="options-section">

                <div className="options-header">
                  <label>Options</label>

                  <button
                    type="button"
                    onClick={() =>
                      addOption(questionIndex)
                    }
                  >
                    + Add Option
                  </button>
                </div>


                {question.options.map(
                  (option, optionIndex) => (
                    <div
                      className="option-input"
                      key={optionIndex}
                    >
                      <input
                        type="text"
                        value={option}
                        placeholder={`Option ${
                          optionIndex + 1
                        }`}
                        onChange={(event) =>
                          handleOptionChange(
                            questionIndex,
                            optionIndex,
                            event.target.value
                          )
                        }
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeOption(
                            questionIndex,
                            optionIndex
                          )
                        }
                      >
                        ×
                      </button>
                    </div>
                  )
                )}


                <div className="form-group">
                  <label>Correct Answer</label>

                  <select
                    name="correctAnswer"
                    value={question.correctAnswer}
                    onChange={(event) =>
                      handleQuestionChange(
                        questionIndex,
                        event
                      )
                    }
                  >
                    <option value="">
                      Select correct answer
                    </option>

                    {question.options.map(
                      (option, optionIndex) => (
                        <option
                          key={optionIndex}
                          value={option}
                        >
                          {option ||
                            `Option ${optionIndex + 1}`}
                        </option>
                      )
                    )}
                  </select>
                </div>

              </div>
            )}

          </div>
        ))}


        <button
          type="submit"
          className="create-assignment-submit"
        >
          Create Assignment
        </button>

      </form>
    </div>
  );
};

export default CreateAssignments;