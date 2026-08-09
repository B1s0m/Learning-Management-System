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
// مثال للاستدعاء
// http://localhost:3000/users/list?isActive=Online&role=student&selections=email
async function getUsersByConditionsWithSelection(req, res){
    try{
        // ياخد السلكشن من الكويري ويخلي الباقي في أوبجكت  اسمه فلتر
        let {selections, ...filter} = req.query
        let conditionUsers = await User.find(filter).select(selections)
        res.status(200).json(conditionUsers)
    }catch(error){
        console.log(error)
        res.status(500).json({message: error})
    }
}
async function updateUserById(req, res) {
    try{
        let thisUser = await User.findById(req.params.id)
        if(req.user._id != String(thisUser._id)){
            return res.status(403).json({message: "You are not authorized to update this User"})
        }
        let profileImage = thisUser.profileImage
        if (req.file) {
            const result = await uploadToCloudinary({
                fileBuffer: req.file.buffer, type: "image", foldername: "lms/users"
            }
            )
            profileImage = result.secure_url
        }
        let {username, email, bio} = req.body
        let updatedUser = await User.findByIdAndUpdate(req.params.id, {
            username,
            email,
            bio,
            profileImage
        }, {new: true})

        res.status(200).json(updatedUser)
    }catch(error){
        console.log(error)
        res.status(500).json({message: error})
    }
}
async function deleteUserById(req,res) {
    try{
        let thisUser = await User.findById(req.params.id)
        let username = thisUser.username
        if(req.user?.role == "admin" || req.user?._id == String(thisUser._id)){
            let deletedUser = await User.findByIdAndDelete(req.params.id)
            return res.status(200).json({message: `${username} Has Been Deleted Seccessfully`})
        }else{
            return res.status(403).json({message: "You are not authorized to delete this User"})
        }
    }catch(error){
        console.log(error)
        res.status(500).json({message: error})
    }
}

module.exports = {
    getUserById, getUsersByConditionsWithSelection, updateUserById, deleteUserById
}