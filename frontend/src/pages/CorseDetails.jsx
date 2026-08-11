import { useNavigate, useParams } from "react-router"
import { getCorseById, deleteCorseById } from "../services/functions/corses"
import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"

function CorseDetails() {
  const [thisCourse, setThisCourse] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    level: "",
    instructor: "",
    isPublished: false,
    price: 0,
    discount: 0
  })
  const { user } = useAuth
  const navigate = useNavigate()
  const { id } = useParams()

  async function loadThisCourse() {
    try {
      const Course = await getCorseById(id)
      setThisCourse(Course.data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    loadThisCourse()
  }, [])
  async function handleDelete(event) {
    deleteCorseById(event.target.id)
    navigate("/courses")
  }
  async function handleEdit(event) {
    
  }


  return (
    <>
    <div>Course Details</div>
    {thisCourse.title != ""?
    <>
    <p>ID: {thisCourse._id}</p>
    <p>title: {thisCourse.title}</p>
    <p>category: {thisCourse.category.name}</p>
    <p>description: {thisCourse.description}</p>
    <p>image: {thisCourse.image}</p>
    <p>level: {thisCourse.level}</p>
    <p>instructor: {thisCourse.instructor.username}</p>
    <p>isPublished: {String(thisCourse.isPublished)}</p>
    <p>price: {thisCourse.price}</p>
    <p>discount: {thisCourse.discount}</p>
    <p>Price With Discount: {thisCourse.price-(thisCourse.price*thisCourse.discount/100)}</p>

    {user && user.role == "admin"?
      <button id={thisUser._id} onClick={handleDelete}>Delete User</button>
      :<></>
    }

    {user && user._id == thisUser._id?
      <button id={thisUser._id} onClick={handleEdit}>Edit User</button>
      :<></>
    }
    </>
  :<>Loading</>}
    </>
  )
}
/* 
  return (
    
  )
}

*/
export default CorseDetails