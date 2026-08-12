import { useNavigate, useParams } from "react-router"
import { getUserById, deleteUserById } from "../services/functions/user"
import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"

function UserDetails() {
  const [thisUser, setThisUser] = useState({
    username: "",
    email: "",
    profileImage: "",
    bio: "",
    expertise: ""
  })
  const { user } = useAuth
  const navigate = useNavigate()
  const {id} = useParams()

  async function loadThisUser() {
    try {
      const user = await getUserById(id)
      setThisUser(user.data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    loadThisUser()
  }, [])
  async function handleDelete(event) {
    deleteUserById(event.target.id)
    navigate("/users/List")
  }
  async function handleEdit(event) {
    
  }
  return (
    <>
    <div>User Details</div>
    {thisUser.email != ""?
    <><p>ID: {thisUser._id}</p>
    <p>Name: {thisUser.username}</p>
    <p>Role: {thisUser.role}</p>
    <p>Email: {thisUser.email}</p>
    <p>Image: {thisUser.profileImage}</p>
    <p>Bio: {thisUser.bio}</p>
    <ul>expertise: {thisUser.expertise.map(one=><li key={one}>{one}</li>)}</ul>

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
  async function handleDelete (event){
    await deleteEntry(event.target.id)
    navigate("/entries")
  }
  async function handleEdit (event){
    navigate("/edit/"+event.target.id)
  }

*/
export default UserDetails