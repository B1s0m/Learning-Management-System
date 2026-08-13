import { useNavigate, useParams } from "react-router"
import { getAllAssignmentByLessonID } from "../services/functions/lesson"
import { useEffect, useState } from "react"

function Assignments() {
    const [allAssignments, setAllAssignments] = useState([])
  const navigate = useNavigate()
  const { lessonId } = useParams()

  async function loadAllAssignments() {
    try {
      const Assignments = await getAllAssignmentByLessonID(lessonId)
      setAllAssignments(Assignments.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadAllAssignments()
  }, [])

  function handleDetails(event) {
    navigate("/assignments/" + event.target.id)
  }

  return (
    <>
      <div>My Assignments</div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>#questions</th>
            <th>dueDate</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allAssignments.length !== 0 ? (
            allAssignments.map((oneAssignment) => (
              <tr key={oneAssignment._id}>
                <td>{oneAssignment.title}</td>
                <td>{oneAssignment.questions.length}</td>
                <td>{oneAssignment.dueDate}</td>
                <td>
                  <button id={oneAssignment._id} onClick={handleDetails}>
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

export default Assignments
