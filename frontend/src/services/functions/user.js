import api from "../api"

async function getAllUsers(filter="", selections) {
    try {
        let allUsers = await api.get("/users/list?"+filter+"&selections="+selections)
        return allUsers
    } catch (error) {
        console.log(error)
    }
}
async function getUserById(id) {
    try {
        let thisUser = await api.get("/users/" + id)
        return thisUser
    } catch (error) {
        console.log(error)
    }
}
async function updateUserById(id, body) {
    try {
        let updatedUser = await api.put("/users/" + id, body)
        return updatedUser
    } catch (error) {
        console.log(error)
    }
}
async function deleteUserById(id) {
    try {
        let deletedUser = await api.delete("/users/" + id)
        return deletedUser
    } catch (error) {
        console.log(error)
    }
}


export {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
}