const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase:true
    },

    hashedPassword: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    }, 
    
    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student"
    },

    profileImage: {
      type: String
    },

    bio: {
      type: String
    },

    expertise: {
      type: [String]
    },

    isActive: {
      type: String,
      enum:["Online", "Last seen today", "Offline", "Busy"],
      default: "Online"
    }
  },{ timestamps: true },
)

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword
  },
})

const User = mongoose.model("User", userSchema)

module.exports = User
