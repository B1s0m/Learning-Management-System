import api from "../api"

async function getAllCorses(filter="", selections) {
    try {
        let allCorses = await api.get("/courses?"+filter+"&selections="+selections)
        return allCorses
    } catch (error) {
        console.log(error)
    }
}
async function getCorseById(id) {
    try {
        let thisCorse = await api.get("/courses/" + id)
        return thisCorse
    } catch (error) {
        console.log(error)
    }
}
async function creatCorse(body) {
    try{
        let createdCourse = await api.post("/courses", body)
        return createdCourse.data
    }catch(error){
        console.log(error)
    }
}
async function updateCorseById(id, body) {
    try {
        let updatedCorse = await api.put("/courses/" + id, body)
        return updatedCorse
    } catch (error) {
        console.log(error)
    }
}
async function deleteCorseById(id) {
    try {
        let deletedCorse = await api.delete("/courses/" + id)
        return deletedcorse
    } catch (error) {
        console.log(error)
    }
}


export {
    getAllCorses,
    getCorseById,
    creatCorse,
    updateCorseById,
    deleteCorseById,
}