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
      console.log(Corses.data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    loadAllCorses()
  }, [])
    async function handleDetails(event) {
    navigate("/corseDetails/" + event.target.id)
  }

  return (
    <>
      <div>My Courses</div>
      <table>
        <thead>
          <tr><th>Title</th> <th>Category</th> <th>Instructor</th> <th>Price</th> <th></th></tr>
        </thead>
        <tbody>
          {allCorses.length != 0 ?
            allCorses.map((oneCorse) => {
              return <>
                <tr key={oneCorse._id}>
                  <td>{oneCorse.title}</td>
                  <td>{oneCorse.category.name}</td>
                  <td>{oneCorse.instructor.username}</td>
                  <td>{oneCorse.price}</td>
                  <td><button id={oneCorse._id} onClick={handleDetails}>More Details</button></td>
                </tr>
              </>
            })
            : <>Loading</>
          }
        </tbody>
      </table>
    </>
  )
}
/* 

  return (
    <>
      
    </>
  )
}

export default CorsesList
*/
export default MyCourses
