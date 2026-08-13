import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { createLessons } from "../services/functions/lesson";
import "../components/css/CreateLesson.css";

const CreateLesson = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    videoUrl: null,
    pdfFile: null,
  });

  function handleChange(event) {
    const { name, value, files } = event.target;

    if (name === "videoUrl" || name === "pdfFile") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("course", courseId);

      if (formData.videoUrl) {
        data.append("videoUrl", formData.videoUrl);
      }

      if (formData.pdfFile) {
        data.append("pdfFile", formData.pdfFile);
      }

      await createLessons(courseId,data);

      navigate("/all/lessons/"+courseId);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="create-lesson-page">

      <h1>Create Lesson</h1>
      <p>Add a new lesson to your course</p>

      <form onSubmit={handleSubmit} className="lesson-form">

        <div className="form-group">
          <label>Lesson Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter lesson title"
            required
          />
        </div>

        <div className="form-group">
          <label>Content</label>

          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Enter lesson content"
            rows="6"
          />
        </div>

        <div className="form-group">
          <label>Lesson Video</label>

          <input
            type="file"
            name="videoUrl"
            accept="video/*"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Lesson PDF</label>

          <input
            type="file"
            name="pdfFile"
            accept="application/pdf"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="create-lesson-btn">
          Create Lesson
        </button>

      </form>
    </div>
  );
};

export default CreateLesson;