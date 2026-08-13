import { useNavigate } from "react-router";
import { getMyCorses, deleteCorseById } from "../services/functions/corses";
import { useEffect, useState } from "react";
import "../components/css/MyCourses.css";
import { useAuth } from "../context/AuthContext";

function MyCourses() {
  const [allCorses, setAllCorses] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  async function loadAllCorses() {
    try {
      const Corses = await getMyCorses();
      setAllCorses(Corses.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadAllCorses();
  }, []);

  function handleShowLessons(courseId) {
    navigate("/all/lessons/" + courseId);
  }

  async function handleDelete(courseId) {
    try {
      await deleteCorseById(courseId);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }   const instructor=allCorses?.[0]?.instructor?._id
    const isOwner = user && instructor && user._id === instructor;
      //  console.log(instructor);

  return (
    <div className="my-courses-page">
      <div className="my-courses-header">
        <h1>My Courses</h1>
        <p>View your courses and lessons</p>
      </div>

      <div className="courses-grid">
        {allCorses.length !== 0 ? (
          allCorses.map((oneCorse) => (
            <div className="course-card" key={oneCorse._id}>
              {oneCorse.image ? (
                <img
                  src={oneCorse.image}
                  alt={oneCorse.title}
                  className="course-image"
                />
              ) : (
                <div className="course-no-image">
                  No Image
                </div>
              )}
              <div className="course-card-header">
                <span className="course-category">
                  {oneCorse.category?.name}
                </span>
              </div>

              <div className="course-card-body">
                <h2>{oneCorse.title}</h2>

                <p className="instructor">
                  Instructor: {oneCorse.instructor?.username}
                </p>

                <p className="price">${oneCorse.price}</p>
              </div>

               <div className="course-actions">
                <button
                  className="lessons-btn"
                  onClick={() => handleShowLessons(oneCorse._id)}
                >
                  View Lessons
                </button>
              {isOwner && <>
             
                <button
                  className="edit-btn"
                  onClick={() => navigate("/editCourse/"  + oneCorse._id)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(oneCorse._id)}
                >
                  Delete
                </button>  
                 </>}
              </div> 
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default MyCourses;
