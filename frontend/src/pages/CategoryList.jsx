import { useNavigate } from "react-router"
import { getAllCategories, deleteCategoryById } from "../services/functions/category"
import { useEffect, useState } from "react"

function CategoriesList() {
  const [allCategories, setAllCategories] = useState([])
  const navigate = useNavigate()

  async function loadAllCategories() {
    try {
      const categories = await getAllCategories()
      setAllCategories(categories.data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    loadAllCategories()
  }, [])

  async function handleDelete(event) {
    deleteCategoryById(event.target.id)
    navigate("/ctegoriesList/")
  }
  return (
    <>
      <div>Categories List</div>
      <table>
        <thead>
          <tr><th>Name</th> <th>Description</th> <th></th></tr>
        </thead>
        <tbody>
          {
            allCategories.map((oneCategory) => {
              return <tr key={oneCategory._id}>
                <td>{oneCategory.name}</td>
                <td>{oneCategory.description}</td>
                <td><button id={oneCategory._id} onClick={handleDelete}>Delete</button></td>
              </tr>
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default CategoriesList