const Category = require("../models/Category")


async function createCategory(req, res) {

    try {
        const {name, description} = req.body
        const createdCategory = await Category.create({ name, description })
        res.status(201).json(createdCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }

}


async function getAllCategory(req, res) {

    try {

        const AllCategory = await Category.find()
        res.status(200).json(AllCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }

}


async function getCategorytById(req, res) {
    try {
        const foundCategory = await Category.findById(req.params.id)
        res.status(200).json(foundCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
}


async function updateCategoryById(req, res) {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body);
        res.json(updatedCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
}


async function deleteCategoryById(req, res) {
    try {
        const deleteCategory = await Category.findByIdAndDelete(req.params.id);
        res.json(deleteCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
}


module.exports={
createCategory,
getAllCategory,
getCategorytById
,updateCategoryById
,deleteCategoryById
}


