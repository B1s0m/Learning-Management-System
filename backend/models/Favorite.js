const mongoose = require("mongoose")

const favoriteSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    }
  },{timestamps: true,}
)

const Favorite = mongoose.model("Favorite", favoriteSchema)
module.exports = Favorite