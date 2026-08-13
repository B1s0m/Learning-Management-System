import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {getLessonById ,updateLessonById}from "../services/functions/lesson"
const EditLesson = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    videoUrl: null,
    pdfFile: null,
    course:""
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

    const data = new FormData();

    data.append("title", formData.title);
    data.append("content", formData.content);

    if (formData.videoUrl) {
      data.append("videoUrl", formData.videoUrl);
    }

    if (formData.pdfFile) {
      data.append("pdfFile", formData.pdfFile);
    }

    await updateLessonById(lessonId, data)

     navigate("/all/lessons/"+formData.course._id);
  }



  async function loadData() {
    try {
      const res = await getLessonById(lessonId);
      setFormData(res.data);
    
    } catch (error) {
      console.log(error);
    } 
  }

  useEffect(() => {
    loadData();
  }, []);



//  console.log(formData.course._id);


  return (
    <div className="edit-lesson-page">
      <h1>Edit Lesson</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Content</label>

          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Change Video</label>

          <input
            type="file"
            name="videoUrl"
            accept="video/*"
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Change PDF</label>

          <input
            type="file"
            name="pdfFile"
            accept="application/pdf"
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          Update Lesson
        </button>
      </form>
    </div>
  );
};

export default EditLesson;