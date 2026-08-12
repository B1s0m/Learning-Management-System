import { useNavigate } from "react-router"
import { getAllUsers, deleteUserById } from "../services/functions/user"
import { useEffect, useState } from "react"

function UsersList() {
  const [allUsers, setAllUsers] = useState([])
  const navigate = useNavigate()

  async function loadAllUsers() {
    try {
      const users = await getAllUsers("", "username role")
      setAllUsers(users.data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    loadAllUsers()
  }, [])

  async function handleDetails(event) {
    navigate("/UserDetails/" + event.target.id)
  }
  return (
    <>
      <div>UsersList </div>
      <table>
        <thead>
          <tr><th>Name</th> <th>Role</th> <th></th></tr>
        </thead>
        <tbody>
          {
            allUsers.map((oneUser) => {
              return (<>
                <tr key={oneUser._id}>
                  <td>{oneUser.username}</td>
                  <td>{oneUser.role}</td>
                  <td><button id={oneUser._id} onClick={handleDetails}>More Details</button></td>
                </tr>
              </>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default UsersList