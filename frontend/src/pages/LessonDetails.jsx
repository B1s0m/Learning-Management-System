import { useNavigate, useParams } from "react-router"
import { getLessonById, deleteLessonById } from "../services/functions/lesson"
import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"

function LessonsPage() {
  const [thisLesson, setThisLesson] = useState({
    title: "",
    content: "",
    videoUrl: "",
    pdfFile: "",
    course: "",
    creactedBy: ""
  })
  const { user } = useAuth()
  const navigate = useNavigate()
  const { lessonId } = useParams()

  async function loadThisLesson() {
    try {
      const Lesson = await getLessonById(lessonId)
      setThisLesson(Lesson.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadThisLesson()
  }, [])

  async function handleDelete(event) {
    const lessonIdToDelete = event.target.id
    const courseId = event.target.name
    try {
      await deleteLessonById(lessonIdToDelete)
      navigate("/lesson/all/" + courseId)
    } catch (err) {
      console.log(err)
    }
  }

  function handleEdit(event) {
    navigate("/lesson/edit/" + event.target.id)
  }

  const isOwner = user && thisLesson.creactedBy && user._id === thisLesson.creactedBy._id

  return (
    <>
      <div>Lesson Details</div>

      {thisLesson.title !== "" ? (
        <>
          <p>ID: {thisLesson._id}</p>
          <p>Title: {thisLesson.title}</p>
          <p>Content: {thisLesson.content}</p>

          {thisLesson.videoUrl && (
            <p>
              VideoUrl:{" "}
              <a href={thisLesson.videoUrl} target="_blank" rel="noreferrer">
                {thisLesson.videoUrl}
              </a>
            </p>
          )}

          {thisLesson.pdfFile && (
            <p>
              PdfFile:{" "}
              <a href={thisLesson.pdfFile} target="_blank" rel="noreferrer">
                {thisLesson.pdfFile}
              </a>
            </p>
          )}

          <p>Course: {thisLesson.course.title}</p>
          <p>CreactedBy: {thisLesson.creactedBy.username}</p>

          {isOwner && (
            <>
              <button id={thisLesson._id} name={thisLesson.course._id} onClick={handleDelete}>
                Delete Lesson
              </button>
              <button id={thisLesson._id} onClick={handleEdit}>
                Edit Lesson
              </button>
            </>
          )}
        </>
      ) : (
        <>Loading</>
      )}
    </>
  )
}

export default LessonsPage