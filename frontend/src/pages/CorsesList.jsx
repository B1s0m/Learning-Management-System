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
      {
        allCorses.map((oneCorse) => {
          return <div key={oneCorse._id}>Title: {oneCorse.title} Category: {oneCorse.category.name} Instructor: {oneCorse.instructor.username} Price: {oneCorse.price}
            <button id={oneCorse._id} onClick={handleDetails}>More Details</button>
          </div>
        })
      }
    </>
  )
}
/* 
      allUsers.map((oneUser)=>{
        return <div key={oneUser._id}>Name: {oneUser.username} Role: {oneUser.role}
        <button id={oneUser._id} onClick={handleDetails}>More Details</button>
        </div>
        })
*/
export default CorsesList