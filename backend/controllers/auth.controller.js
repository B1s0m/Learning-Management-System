const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

async function signUp(req, res) {
  try {
    const { username, password, email, profileImage, bio } = req.body;

    // Validation
    if (!username || !password || !email) return res.status(400).json({message: "Username, password and email are required.",});
    if (password.length < 3) return res.status(400).json({message: "Password must be more than 3 characters",});

    const user = await User.create({
      username,
      hashedPassword: await bcrypt.hash(password, 12),
      email,
      profileImage,
      bio,
      expertise: ""
    })

    const { _id, createdAt } = user

    res
      .status(201)
      .json({ username, _id, email, bio, createdAt })
  } catch (err) {
    console.log(err);
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: err.message,
      });
    }
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Username or email already exists",
      })
    }

    console.log(err)
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function signIn(req, res) {
  try {
    // const { email, password } = req.body
    const { username, password } = req.body;

    // if (!email || !password) {
    if (!username || !password) {
      return res.status(400).json({
        // message: "Email and password are required.",
        message: "Username and password are required.",
      })
    }
    // const user = await User.findOne({ email:email.toLowerCase().trim() });
    const user = await User.findOne({ username:username.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.hashedPassword,
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Construct the payload
    const payload = { username: user.username, _id: user._id }


    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d"
    })
    return res.status(200).json({
      accessToken,
      user: {
        _id: user._id,
        username: user.username,
        role: user.role
      }
    })
  } catch (err) {
    console.error(err)

    return res.status(500).json({
      message: "Internal Server Error"
    })
  }
}

async function verifyUser(req, res) {
  try {
    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      })
    }

    return res.status(200).json({
        _id: user._id,
        username: user.username,
        role: user.role
    })
  } catch (err) {
    console.error(err)

    return res.status(500).json({
      message: "Internal Server Error"
    })
  }
}
async function verifyAdmin(req, res) {
  try {
    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      })
    }else if(user.role !== "admin"){
        return res.status(403).json({
          message: "This is not within your authority."
        })
      }
    return res.status(200).json({
        _id: user._id,
        username: user.username,
        role: user.role
    })
  } catch (err) {
    console.error(err)

    return res.status(500).json({
      message: "Internal Server Error"
    })
  }
}
async function verifyInstructor(req, res) {
  try {
    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      })
    }else if(user.role !== "instructor"){
        return res.status(403).json({
          message: "You are not authorized to do this."
        })
    }
    return res.status(200).json({
        _id: user._id,
        username: user.username,
        role: user.role
    })
  } catch (err) {
    console.error(err)

    return res.status(500).json({
      message: "Internal Server Error"
    })
  }
}

module.exports = {
  signUp,
  signIn,
  verifyUser,
  verifyAdmin,
  verifyInstructor
};
