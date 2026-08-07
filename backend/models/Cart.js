const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        items: [
            {
                course: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Course",
                    required: true,
                },

                price: {
                    type: Number,
                    required: true,
                    min: 0,
                },
            },
        ],

        totalPrice: {
            type: Number,
            default: 0
        },

    },
    {
        timestamps: true,
    }
);

let Cart=mongoose.model("Cart", cartSchema);
module.exports = Cart;