import api from "../api"

async function getAllLessons(courseId) {
    try {
        let allLessons = await api.get("/lesson/all/"+courseId)
        return allLessons
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

export {
    getAllLessons,
    getLessonById,
    deleteLessonById
}