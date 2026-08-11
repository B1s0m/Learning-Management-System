import { useNavigate } from "react-router"
import { getAllCategories, deleteCategoryById } from "../services/functions/category"
import { useEffect, useState } from "react"

function CategoriesList() {
  const [allCategories, setAllCategories] = useState([])
  const navigate = useNavigate()

  async function loadAllCategories(){
    try{
        const categories = await getAllCategories()
        setAllCategories(categories.data)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    loadAllCategories()
  }, [])

  async function handleDelete(event) {
    deleteCategoryById(event.target.id)
    navigate("/ctegoriesList/")
  }
  return (
    <>
    <div>Categories List</div>
    {
      allCategories.map((oneCategory)=>{
        return <div key={oneCategory._id}>Name: {oneCategory.name} 
        <div>Description: {oneCategory.description}</div>
        <button id={oneCategory._id} onClick={handleDelete}>Delete</button>
        </div>
        })
    }
    </>
  )
}

export default CategoriesList