import { useNavigate } from "react-router"
import { getAllCorses, deleteCorseById } from "../services/functions/corses"
import { useEffect, useState } from "react"
import "../components/css/CorsesList.css"
function coursesList() {
  const [allCorses, setAllCorses] = useState([]);
  const navigate = useNavigate();

  async function loadAllCorses() {
    try {
      const Corses = await getAllCorses(
        "isPublished=true",
        "title category instructor price image"
      );

      setAllCorses(Corses.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadAllCorses();
  }, []);

  function handleDetails(id) {
    navigate("/corseDetails/" + id);
  }
        console.log(allCorses);
   return (
    <div className="courses-page">
      
      <div className="courses-header">
        <h1>Courses</h1>
        <p>Browse and view all available courses</p>
      </div>

      <div className="courses-grid">
        {allCorses.length > 0 ? (
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

              <div className="course-card-content">

                <div className="course-card-header">
                  <span className="course-category">
                    {oneCorse.category?.name}
                  </span>
                </div>

                <div className="course-card-body">

                  <h2>{oneCorse.title}</h2>

                  <p className="course-instructor">
                    Instructor: {oneCorse.instructor?.username}
                  </p>

                  <p className="course-price">
                    ${oneCorse.price}
                  </p>

                </div>

       
                <div className="course-actions">
                  <button
                    className="course-details-btn"
                    onClick={() => handleDetails(oneCorse._id)}
                  >
                    More Details
                  </button>
                </div>

              </div>
            </div>
          ))
        ) : (
          <p className="courses-loading">Loading...</p>
        )}
      </div>

    </div>
  );
}
export default coursesList;
