const Cart = require("../models/Cart")
const Course = require("../models/Course")
const Enrollment = require("../models/Enrollment");

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


        const id = req.params.id
        const findCourse = await Course.findById(id)

        if (!findCourse) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        let hasCart = await Cart.findOne({ student: req.user._id })

        if (!hasCart) {
            let hasCart = await Cart.create({
                student: req.user._id,
                items: []
            })



            hasCart.items.push({ course: id, price: findCourse.price })




            await hasCart.save();



            return res.status(201).json(hasCart)

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
}

async function checkoutCart(req, res) {
    try {

        const student = req.user._id

        const myCart = await Cart.findOne({ student })

        if (!myCart) {
            return res.status(404).json({
                message: "Course not found",
            });
        }
        if (myCart.items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty",
            });
        }


        for (const item of myCart.items) {
            await Enrollment.create({
                student,
                course: item.course,
                accessType: "purchase",
                amount: item.price,
            });
        }
        const deleteallCart = await Cart.deleteOne({ student });

        return res.status(200).json({
            message: "Checkout successful",
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
}


async function deleteCartById(req, res) {
    try {
        const student = req.user._id

        const courseId = req.params.courseId

        const myCart = await Cart.findOne({ student })

        if (!myCart) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        myCart.items = myCart.items.filter((item) => String(item.course) != courseId)

        await myCart.save();

        return res.status(200).json(myCart);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
}

async function deleteAllCart(req, res) {
    try {
        const student = req.user._id
        const deleteallCart = await Cart.findByIdAndDelete(student );
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


