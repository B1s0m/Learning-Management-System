import api from "../api"

async function getAllCategories(filter="") {
    try {
        let allCategories = await api.get("/categories?"+filter+"&selections=")
        return allCategories
    } catch (error) {
        console.log(error)
    }
}
async function getCategoryById(id) {
    try {
        let thisCategory = await api.get("/categories/" + id)
        return thisCategory
    } catch (error) {
        console.log(error)
    }
}
async function creatCategory(body) {
    try{
        let createdCourse = await api.post("/categories", body)
        return createdCourse.data
    }catch(error){
        console.log(error)
    }
}
async function updateCategoryById(id, body) {
    try {
        let updatedCategory = await api.put("/categories/" + id, body)
        return updatedCategory
    } catch (error) {
        console.log(error)
    }
}
async function deleteCategoryById(id) {
    try {
        let deletedCategory = await api.delete("/categories/" + id)
        return deletedCategory
    } catch (error) {
        console.log(error)
    }
}


export {
    getAllCategories,
    getCategoryById,
    creatCategory,
    updateCategoryById,
    deleteCategoryById,
}