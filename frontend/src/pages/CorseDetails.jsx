import { useNavigate, useParams } from "react-router";
import { getCorseById, deleteCorseById } from "../services/functions/corses";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../components/css/CourseDetails.css";
import { addToCart } from "../services/functions/cart";
function CorseDetails() {
  const [thisCourse, setThisCourse] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    level: "",
    instructor: "",
    isPublished: false,
    price: 0,
    discount: 0,
  });
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  async function loadThisCourse() {
    try {
      const Course = await getCorseById(id);
      setThisCourse(Course.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    loadThisCourse();
  }, []);
  async function handleDelete(event) {
    deleteCorseById(event.target.id);
    navigate("/coursesList");
  }
  // async function handleEdit(event) {}

  async function handleAddToCart(event) {
    event.preventDefault();
    try {
      console.log(id);
     const res=  await addToCart(id);
      navigate("/coursesList");
    } catch (err) {
      console.log(err);
    }
  }

  // console.log(user._id);
  return (
    <div className="course-details-page">
      {thisCourse.title !== "" ? (
        <>
          <div className="course-details-card">
            <div className="course-details-image-section">
              {thisCourse.image ? (
                <img
                  src={thisCourse.image}
                  alt={thisCourse.title}
                  className="course-details-image"
                />
              ) : (
                <div className="course-details-no-image">No Image</div>
              )}
            </div>

            <div className="course-details-content">
              <div className="course-details-top">
                <div>
                  <div className="course-badges">
                    <span className="course-category-badge">
                      {thisCourse.category?.name}
                    </span>

                    {/* <span className="course-level-badge">
                    {thisCourse.level}
                  </span> */}
                  </div>

                  <h1>{thisCourse.title}</h1>

                  <p className="course-instructor">
                    Instructor: {thisCourse.instructor?.username}
                  </p>
                </div>

                {(user?.role === "admin" ||
                  user?._id === thisCourse.instructor?._id) && (
                  <div className="course-details-actions">
                    <button
                      className="edit-course-btn"
                      onClick={() => handleEdit(thisCourse._id)}
                    >
                      Edit Course
                    </button>

                    <button
                      className="delete-course-btn"
                      onClick={() => handleDelete(thisCourse._id)}
                    >
                      Delete Course
                    </button>
                  </div>
                )}
              </div>

              <div className="course-description-section">
                <h2>About this course</h2>

                <p>{thisCourse.description}</p>
              </div>

              <div className="course-info-grid">
                <div className="course-info-item">
                  <span>Level</span>
                  <strong>{thisCourse.level}</strong>
                </div>

                <div className="course-info-item">
                  <span>Instructor</span>
                  <strong>{thisCourse.instructor?.username}</strong>
                </div>

                <div className="course-info-item">
                  <span>Discount</span>
                  <strong>{thisCourse.discount}%</strong>
                </div>
              </div>

              <div className="course-price-section">
                <div className="course-price-info">
                  {thisCourse.discount > 0 ? (
                    <>
                      <span className="old-price">${thisCourse.price}</span>

                      <span className="discounted-price">
                        $
                        {(
                          thisCourse.price -
                          (thisCourse.price * thisCourse.discount) / 100
                        ).toFixed(2)}
                      </span>

                      <span className="discount-badge">
                        {thisCourse.discount}% OFF
                      </span>
                    </>
                  ) : (
                    <span className="discounted-price">
                      ${thisCourse.price}
                    </span>
                  )}
                </div>

                {user?.role == "student" && (
                  <button className="add-cart-btn" onClick={handleAddToCart}>
                    🛒 Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="course-details-loading">Loading...</p>
      )}
    </div>
  );
}

export default CorseDetails;
