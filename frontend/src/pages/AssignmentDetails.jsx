import { useNavigate, useParams } from "react-router";
import {
  getAssignmentByID,
  deleteAssignmentByID,
} from "../services/functions/lesson";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../components/css/AssignmentDetails.css";

function AssignmentDetails() {

  const [thisAssignment, setThisAssignment] = useState({
    title: "",
    instructions: "",
    instructionsFile: "",
    questions: [],
    dueDate: "",
    lesson: "",
  });
  const { user } = useAuth();
  const navigate = useNavigate();
  const { assignmentId } = useParams();

  async function loadThisAssignment() {
    try {
      const Assignment = await getAssignmentByID(assignmentId);
      setThisAssignment(Assignment.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadThisAssignment();
  }, []);

  async function handleDelete(event) {
    const assignmentIdToDelete = event.target.id;
    const lessonId = event.target.name;
    try {
      await deleteAssignmentByID(assignmentIdToDelete);
      navigate("/lessons/" + lessonId);
    } catch (err) {
      console.log(err);
    }
  }

  function handleEdit(event) {
    navigate("/assignments/edit/" + event.target.id);
  }
  const isOwner = user &&thisAssignment.lesson?.creactedBy &&
    user._id.toString() === thisAssignment.lesson.creactedBy.toString();

  return (
    <div className="assignment-details-page">
      {thisAssignment.title !== "" ? (
        <>
          <div className="assignment-header">
            <div>
              <span className="assignment-label">Assignment</span>

              <h1>{thisAssignment.title}</h1>

              <p className="due-date">
                Due Date:{" "}
                {new Date(thisAssignment.dueDate).toLocaleDateString()}
              </p>
            </div>

            {isOwner && (
              <div className="assignment-actions">
                <button
                  className="edit-assignment-btn"
                  onClick={() =>
                    navigate("/assignments/edit/" + thisAssignment._id)
                  }
                >
                  Edit Assignment
                </button>

                <button
                  className="delete-assignment-btn"
                  id={thisAssignment._id}
                  name={thisAssignment.lesson?._id}
                  onClick={handleDelete}
                >
                  Delete Assignment
                </button>
              </div>
            )}
          </div>

          <div className="instructions-card">
            <h2>Instructions</h2>

            <p>{thisAssignment.instructions}</p>

            {thisAssignment.instructionsFile && (
              <a
                href={thisAssignment.instructionsFile}
                target="_blank"
                rel="noreferrer"
                className="instructions-file-btn"
              >
                📄 Open Instructions File
              </a>
            )}
          </div>

          <div className="questions-section">
            <div className="questions-header">
              <h2>Questions</h2>

              <span>{thisAssignment.questions.length} Questions</span>
            </div>

            <div className="questions-list">
              {thisAssignment.questions.map((one, index) => (
                <div className="question-card" key={one._id}>
                  <div className="question-number">Question {index + 1}</div>

                  <h3>{one.questionText}</h3>

                  <p className="question-type">Type: {one.questionType}</p>

                  {one.questionType === "multiple-choice" &&
                    one.options?.length > 0 && (
                      <div className="question-options">
                        {one.options.map((option, optionIndex) => (
                          <div className="option-item" key={optionIndex}>
                            <span>
                              {String.fromCharCode(65 + optionIndex)}.
                            </span>

                            {option}
                          </div>
                        ))}
                      </div>
                    )}

                  {isOwner && one.correctAnswer && (
                    <div className="correct-answer">
                      <strong>Correct Answer:</strong> {one.correctAnswer}
                    </div>
                  )}

                  {one.marks && (
                    <div className="question-marks">{one.marks} Marks</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p className="assignment-loading">Loading...</p>
      )}
    </div>
  );
}

export default AssignmentDetails;
