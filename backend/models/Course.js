const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    description: {
      type: String,
      required: true
    },

    image: {
      type: String
    },

    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner"
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },


    isPublished: {
      type: Boolean,
      default: false
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    accessCode: {
      type: String,
      trim: true,
      default: null,
    },

    accessCodeActive: {
      type: Boolean,
      default: false,
    },
    

  }, { timestamps: true }
)

let Course = mongoose.model("Course", courseSchema)
module.exports = Course