import { useNavigate, useParams } from "react-router"
import { getAllLessons } from "../services/functions/lesson"
import { useEffect, useState } from "react"

function Lessons() {
  const [allLessons, setAllLessons] = useState([])
  const navigate = useNavigate()
  const { courseId } = useParams()

  async function loadAllLessons() {
    try {
      const Lessons = await getAllLessons(courseId)
      setAllLessons(Lessons.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadAllLessons()
  }, [])

  function handleDetails(event) {
    navigate("/lesson/" + event.target.id)
  }

  return (
    <>
      <div>My Lessons</div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Course</th>
            <th>Instructor</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allLessons.length !== 0 ? (
            allLessons.map((oneLesson) => (
              <tr key={oneLesson._id}>
                <td>{oneLesson.title}</td>
                <td>{oneLesson.course.title}</td>
                <td>{oneLesson.creactedBy.username}</td>
                <td>
                  <button id={oneLesson._id} onClick={handleDetails}>
                    More Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default Lessons