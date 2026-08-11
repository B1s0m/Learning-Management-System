import { useNavigate } from "react-router"
import { getAllCorses, deleteCorseById } from "../services/functions/corses"
import { useEffect, useState } from "react"

function CorsesList() {
  const [allCorses, setAllCorses] = useState([])
  const navigate = useNavigate()

  async function loadAllCorses() {
    try {
      const Corses = await getAllCorses("","title category instructor price")
      setAllCorses(Corses.data)
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
      <div>Corses List</div>
      {allCorses.length !=0?
        allCorses.map((oneCorse) => {
          return <div key={oneCorse._id}>Title: {oneCorse.title} Category: {oneCorse.category.name} Instructor: {oneCorse.instructor.username} Price: {oneCorse.price}
            <button id={oneCorse._id} onClick={handleDetails}>More Details</button>
          </div>
        })
        :<>Loading</>
      }
    </>
  )
}

export default CorsesList