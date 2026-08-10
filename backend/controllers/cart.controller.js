const Cart = require("../models/Cart")



async function getAllCart(req, res) {

    try {

        const AllCart = await Cart.find()
        res.status(200).json(AllCart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }

}



async function addCart(req, res) {
    try {

        // const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // res.json(updatedCart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
}

async function checkoutCart(req, res) {
    try {

        // const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // res.json(updatedCart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
}


async function deleteCartById(req, res) {
    try {

        const deleteCart = await Cart.findByIdAndDelete(req.params.id);
        res.json(deleteCart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
}

async function deleteAllCart(req, res) {
    try {
        const student = req.user._id
        const deleteallCart = await Cart.deleteMany({student});
        res.json(deleteallCart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
}


module.exports = {
    getAllCart,
    addCart
    , deleteCartById, deleteAllCart, checkoutCart
}


