// imports
const express = require("express") //importing express package
const app = express() // creates a express application
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const morgan = require('morgan')
const cors = require('cors')

// Routes Import
const authRoutes = require('./routes/auth.routes')
const userRoutes=require("./routes/user.routers")
const categoriesRoutes=require("./routes/categories.routes")
const coursesRoutes=require("./routes/courses.routes")
const lessonRoutes=require("./routes/lesson.routes")
const submissionRouters= require("./routes/submission.routers")
const assignmentsRoutes=require("./routes/assignment.routes")
const cartsRoutes = require("./routes/cart.routes")
const EnrollmentRoutes =require("./routes/enrollment.routes")
// Middleware
app.use(
    cors({
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
    })
);
app.use(express.json())
app.use(morgan('dev'))



// Routes
app.use('/auth',authRoutes)
app.use('/users',userRoutes)
app.use("/submissions", submissionRouters)
app.use("/carts", cartsRoutes)
app.use('/',categoriesRoutes)
app.use('/',coursesRoutes)
app.use('/',lessonRoutes)
app.use('/',assignmentsRoutes)
app.use('/',EnrollmentRoutes)




module.exports = app