const Assignment = require("../models/Assignment")



async function createassignment(req, res) {

    try {
         const lesson =req.params.lessonid
        const { title, instructions,dueDate,questions} = req.body
        const createdassignment = await Assignment.create({ title, instructions,dueDate,questions,lesson})
        res.status(201).json(createdassignment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }

}

module.exports = {
createassignment


}