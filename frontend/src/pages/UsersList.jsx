import { useNavigate } from "react-router"
import { getAllCorses, deleteCorseById } from "../services/functions/corses"
import { useEffect, useState } from "react"

function UsersList() {
  const [allUsers, setAllUsers] = useState([])
  const navigate = useNavigate()

  async function loadAllUsers(){
    try{
        const users = await getAllCorses("","username role")
        setAllUsers(users.data)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    loadAllUsers()
  }, [])

  async function handleDetails(event) {
    navigate("/CorseDetails/"+event.target.id)
  }
  return (
    <>
    <div>UsersList </div>
    {
      allUsers.map((oneUser)=>{
        return <div key={oneUser._id}>Name: {oneUser.username} Role: {oneUser.role}
        <button id={oneUser._id} onClick={handleDetails}>More Details</button>
        </div>
        })
    }
    </>
  )
}

export default UsersList