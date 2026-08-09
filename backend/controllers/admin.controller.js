const User = require("../models/User")

async function getUserById(req, res){
    try{
        let thisUser = await User.findById(req.params.id)
        res.status(200).json(thisUser)
    }catch(error){
        console.log(error)
        res.status(500).json({message: error})
    }   
}
async function getAllUsersWithSelection(params) {
    try{
        let allSelectedUsers = await User.find().select(req.params.selections)
        res.status(200).json(allSelectedUsers)
    }catch(error){
        console.log(error)
        res.status(500).json({message: error})
    }
}
async function getAllUsers(req,res){
    try{
        let allUsers = await User.find()
        res.status(200).json(allUsers)
    }catch(error){
        console.log(error)
        res.status(500).json({message: error})
    }
}
async function getUsersByConditions(req, res){
    try{
        let conditionUsers = await User.find(req.query)
        res.status(200).json(conditionUsers)
    }catch(error){
        console.log(error)
        res.status(500).json({message: error})
    }
}
async function getUsersByConditionsWithSelection(req, res){
    try{
        let conditionUsers = await User.find(req.query).select(req.params.selections)
        res.status(200).json(conditionUsers)
    }catch(error){
        console.log(error)
        res.status(500).json({message: error})
    }
}

module.exports = {
    getUserById, getAllUsersWithSelection, getAllUsers, getUsersByCondition
}