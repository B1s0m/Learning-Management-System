import { useNavigate, useParams } from "react-router";
import {
  getLessonById,
  deleteLessonById,
  getAllAssignmentByLessonID,
} from "../services/functions/lesson";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../components/css/LessonDetails.css";
function LessonsPage() {
  const [allAssignments, setAllAssignments] = useState([]);

  const [thisLesson, setThisLesson] = useState({
    title: "",
    content: "",
    videoUrl: "",
    pdfFile: "",
    course: "",
    creactedBy: "",
  });
  const { user } = useAuth();
  const navigate = useNavigate();
  const { lessonId } = useParams();

  async function loadThisLesson() {
    try {
      const Lesson = await getLessonById(lessonId);
      setThisLesson(Lesson.data);
      const Assignments = await getAllAssignmentByLessonID(lessonId);
      setAllAssignments(Assignments.data);
      console.log(allAssignments);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadThisLesson();
  }, []);

  async function handleDelete(event) {
    const lessonIdToDelete = event.target.id;
    const courseId = event.target.name;
    try {
      await deleteLessonById(lessonIdToDelete);
      navigate("/all/lessons/" + courseId);
    } catch (err) {
      console.log(err);
    }
  }

  function handleEdit(event) {
    navigate("/EditLesson/" + event.target.id);
  }

  const isOwner = user && thisLesson.creactedBy && user._id === thisLesson.creactedBy._id;
  // console.log(thisLesson.pdfFile);
  return (
    <div className="lesson-details-page">
      {thisLesson.title !== "" ? (
        <>
          <div className="lesson-details-header">
            <div className="lesson-header-info">
              <span className="lesson-course">{thisLesson.course?.title}</span>

              <h1>{thisLesson.title}</h1>

              <p>Instructor: {thisLesson.creactedBy?.username}</p>
            </div>

            {isOwner && (
              <div className="lesson-actions">
                <button
                  className="create-assignment-btn"
                  onClick={() =>
                    navigate("/createAssignment/" + thisLesson._id)
                  }
                >
                  Create Assignment
                </button>

                <button
                  className="edit-lesson-btn"
                  onClick={() => navigate("/editLesson/" + thisLesson._id)}
                >
                  Edit Lesson
                </button>

                <button
                  className="delete-lesson-btn"
                  id={thisLesson._id}
                  name={thisLesson.course?._id}
                  onClick={handleDelete}
                >
                  Delete Lesson
                </button>
              </div>
            )}
          </div>

          <div className="lesson-content-card">
            <h2>Lesson Content</h2>

            <p className="lesson-content">{thisLesson.content}</p>
          </div>

          <div className="lesson-resources">
            {thisLesson.videoUrl && (
              <div className="lesson-video">
                <div>
                  <h3>🎥 Lesson Video</h3>
                  <p>Watch the video for this lesson</p>
                </div>

                {thisLesson.videoUrl && (
                  <div>
                    <video controls>
                      <source src={thisLesson.videoUrl} />
                      Your browser does not support video.
                    </video>
                  </div>
                )}
              </div>
            )}

            {thisLesson.pdfFile && (
              <div className="lesson-pdf">
                <div>
                  <h3>📄 Lesson Material</h3>
                  <p>PDF document for this lesson</p>
                </div>

                <a
                  href={thisLesson.pdfFile}
                  target="_blank"
                  rel="noreferrer"
                  className="pdf-btn"
                >
                  Open PDF
                </a>
              </div>
            )}
          </div>

          <div className="assignments-section">
            <div className="assignments-header">
              <h2>Assignments</h2>
              <p>View assignments and activities for this lesson.</p>
            </div>

            {allAssignments.length > 0 ? (
              <div className="assignments-list">
                {allAssignments.map((one) => (
                  <div className="assignment-item" key={one._id}>
                    <div className="assignment-info">
                      <h3>{one.title}</h3>

                      <p>
                        Due Date: {new Date(one.dueDate).toLocaleDateString()}
                      </p>
                    </div>

                    <button
                      className="view-assignments-btn"
                      onClick={() => navigate("/assignments/details/"+one._id)}
                    >
                      View Assignment →
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-assignments">No assignments found.</p>
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default LessonsPage;
