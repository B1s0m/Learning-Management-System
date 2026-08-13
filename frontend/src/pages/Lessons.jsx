import { useNavigate, useParams } from "react-router";
import { getAllLessons } from "../services/functions/lesson";
import { useEffect, useState } from "react";
import "../components/css/AllLesson.css";
function Lessons() {
  const [allLessons, setAllLessons] = useState([]);
  const navigate = useNavigate();
  const { courseId } = useParams();

  async function loadAllLessons() {
    try {
      const Lessons = await getAllLessons(courseId);
      setAllLessons(Lessons.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadAllLessons();
  }, []);

  function handleDetails(event) {
    navigate("/lessons/" + event.target.id);
  }
  return (
    <div className="lessons-page">
      <div className="lessons-header">
        <h1>My Lessons</h1>
        <p>Continue learning through your course lessons</p>
        <button onClick={() => navigate("/CreateLesson/"+courseId)}>
          Add lessons
        </button>
      </div>

      <div className="lessons-list">
        {allLessons.length !== 0 ? (
          allLessons.map((oneLesson, index) => (
            <div className="lesson-card" key={oneLesson._id}>
              <div className="lesson-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="lesson-info">
                <h2>{oneLesson.title}</h2>

                <div className="lesson-meta">
                  <span>📚 {oneLesson.course?.title}</span>
                  <span>👤 {oneLesson.creactedBy?.username}</span>
                </div>
              </div>

              <button
                className="view-lesson-btn"
                onClick={() => navigate("/lessons/"+oneLesson._id)}
              >
                View Lesson →
              </button>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Lessons;
