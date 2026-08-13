import api from "../api"

async function getAllLessons(courseId) {
    try {
        let allLessons = await api.get("/lesson/all/"+courseId)
        return allLessons
    } catch (error) {
        console.log(error)
    }
}

async function createLessons(courseId,body) {
    try {
        let createLesson = await api.post("/lesson/"+courseId,body)
        return createLesson
    } catch (error) {
        console.log(error)
    }
}

async function updateLessonById(Id,body) {
    try {
        let updateLesson = await api.put("/lesson/"+Id,body)
        return updateLesson
    } catch (error) {
        console.log(error)
    }
}

async function getLessonById(id) {
    try {
        let thisLesson = await api.get("/lesson/" + id)
        return thisLesson
    } catch (error) {
        console.log(error)
    }
}
async function deleteLessonById(id) {
    try {
        let deletedLesson = await api.delete("/lesson/" + id)
        return deletedLesson
    } catch (error) {
        console.log(error)
    }
}
async function getAllAssignmentByLessonID(id) {
    try{
        let allAssignments = await api.get("/assignments/lesson/"+id)
         console.log(allAssignments.data);
        return allAssignments
    }catch(error){
        console.log(error)
    }
}
async function getAssignmentByID(id) {
    try{
        let thisAssignment = await api.get("/assignments/"+id)
        return thisAssignment
    }catch(error){
        console.log(error)
    }
}

async function createAssignment(id,body) {
    try{
        let createdAssignment = await api.post("/assignments/lesson/"+id,body)
        return createdAssignment.data
    }catch(error){
        console.log(error)
    }
}

async function deleteAssignmentByID(id) {
    try{
        let toDeleteAssignment = await api.delete("/assignments/"+id)
        return toDeleteAssignment
    }catch(error){
        console.log(error)
    }
}

export {
    getAllLessons,
    getLessonById,
    deleteLessonById,
    getAllAssignmentByLessonID,
    getAssignmentByID,
    deleteAssignmentByID,
    createLessons,updateLessonById ,createAssignment
}