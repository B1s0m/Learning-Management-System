const Cart = require("../models/Cart")

// مثال للاستدعاء
// http://localhost:3000/carts/list?isActive=Online&role=student&selections=email
async function getCartsByConditionsWithSelection(req, res) {
    try {
        // ياخد السلكشن من الكويري ويخلي الباقي في أوبجكت  اسمه فلتر
        let { selections, ...filter } = req.query
        let conditionCarts = await Cart.find(filter).select(selections)
        res.status(200).json(conditionCarts)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}


async function creatCart(req, res) {
    try {
        let hasCart = await Cart.findOne({ student: req.user_id })
        if (req.user.role == "student" && !hasCart) {
            let createdCart = await Cart.create({
                student: req.user_id,
                items: []
            })
            return res.status(201).json(createdCart)
        }else{
            return res.status(403).json({message: "You Are Not A Student Or You Have Alredy A Cart"})
        }
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
        const deleteallCart = await Cart.deleteMany({ student });
        res.json(deleteallCart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
}


module.exports = {
    getCartsByConditionsWithSelection,
    creatCart,
    deleteCartById,
    deleteAllCart,
    checkoutCart
}


