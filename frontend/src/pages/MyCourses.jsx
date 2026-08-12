import { useNavigate } from "react-router"
import { getMyCorses } from "../services/functions/corses"
import { useEffect, useState } from "react"

function MyCourses() {
  const [allCorses, setAllCorses] = useState([])
  const navigate = useNavigate()

  async function loadAllCorses() {
    try {
      const Corses = await getMyCorses()
      setAllCorses(Corses.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadAllCorses()
  }, [])

  function handleShowLessons(event) {
    const courseId = event.target.id
    navigate("/all/lessons/" + courseId)
  }

  return (
    <>
      <div>My Courses</div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Instructor</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allCorses.length !== 0 ? (
            allCorses.map((oneCorse) => (
              <tr key={oneCorse._id}>
                <td>{oneCorse.title}</td>
                <td>{oneCorse.category.name}</td>
                <td>{oneCorse.instructor.username}</td>
                <td>{oneCorse.price}</td>
                <td>
                  <button id={oneCorse._id} onClick={handleShowLessons}>
                    Lessons
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default MyCourses