import "../components/css/CreateCourses.css";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllCategory } from "../services/instructorService";
import { getCorseById, updateCorseById } from "../services/functions/corses";
import { useNavigate, useParams } from "react-router";
const editCourse = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    level: "beginner",
    isPublished: false,
    price: 0,
    discount: 0,
    accessCode: "",
    accessCodeActive: false,
  });
  const { id } = useParams();

  const navigate = useNavigate();
  function handleChange(event) {
    const { name, value, type, checked, files } = event.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("category", formData.category?._id || formData.category);
      data.append("description", formData.description);
      data.append("level", formData.level);
      data.append("price", formData.price);
      data.append("discount", formData.discount);
      data.append("isPublished", formData.isPublished);
      data.append("accessCode", formData.accessCode);
      data.append("accessCodeActive", formData.accessCodeActive);

      if (formData.image instanceof File) {
        data.append("image", formData.image);
      }

      await updateCorseById(id, data);

      navigate("/myCourses");
    } catch (error) {
      console.log(error);
    }
  }

  async function loadData() {
    try {
      const resC = await getAllCategory();
      setCategory(resC);

      const resc = await getCorseById(id);
      setFormData(resc.data);
      console.log(resc.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <h1>Edit Course</h1>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="title">Course Title: </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            required
            value={formData.title}
          />
        </div>

        <div>
          <label htmlFor="category">Category:</label>

          <select
            id="category"
            name="category"
            onChange={handleChange}
            value={formData.category._id}
            required
          >
            <option value="">Select Category</option>

            {category.map((one) => (
              <option key={one._id} value={one._id}>
                {one.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            required
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <label htmlFor="image">Course Image:</label>
          {formData.image && (
            <img src={formData.image} alt="Course" width="200" />
          )}

          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="level">Level:</label>
          <select id="level" name="level" onChange={handleChange}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label htmlFor="price">Price:</label>
          <input
            onChange={handleChange}
            type="number"
            id="price"
            name="price"
            min="0"
            step="0.01"
            required
            value={formData.price}
          />
        </div>

        <div>
          <label htmlFor="discount">Discount:</label>
          <input
            onChange={handleChange}
            type="number"
            id="discount"
            name="discount"
            min="0"
            value={formData.discount}
            max="100"
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
            />
            Publish Course
          </label>
        </div>

        <div>
          <label htmlFor="accessCode">Access Code:</label>
          <input
            type="text"
            id="accessCode"
            name="accessCode"
            value={formData.accessCode}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="accessCodeActive"
              checked={formData.accessCodeActive}
              onChange={handleChange}
            />
            Enable Access Code
          </label>
        </div>

        <button type="submit">Update Course</button>
      </form>
    </div>
  );
};

export default editCourse;
