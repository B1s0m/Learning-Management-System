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
        "",
        "title category instructor price"
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

  return (
    <div className="courses-page">

      <div className="courses-header">
        <div>
          <h1>Courses</h1>
          <p>Manage and view all courses</p>
        </div>
      </div>

      <div className="table-container">
        <table className="courses-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Instructor</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {allCorses.length !== 0 ? (
              allCorses.map((oneCorse) => (
                <tr key={oneCorse._id}>
                  <td>{oneCorse.title}</td>

                  <td>
                    <span className="category">
                      {oneCorse.category?.name}
                    </span>
                  </td>

                  <td>{oneCorse.instructor?.username}</td>

                  <td className="price">
                    ${oneCorse.price}
                  </td>

                  <td>
                    <button
                      className="details-btn"
                      onClick={() => handleDetails(oneCorse._id)}
                    >
                      More Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="loading">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
export default coursesList;
