const express = require("express")
const studentRouter = require("./src/routes/studentRouter")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config({path: './.env'})
const bodyParser = require("body-parser")
const morgan = require("morgan")
const mongoose = require("mongoose")
const rateLimiter = require("express-rate-limit")
const helmet = require("helmet")
const mongoSanitize = require("express-mongo-sanitize")





// middleware implementation
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan("dev"))
app.use(helmet())
app.use(mongoSanitize())

// Request rate limiting
const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 request per windowMs
})
app.use(limiter)


// Mongo DB Database connection
//console.log(process.env.DATABASE_URL)
const url = process.env.DATABASE_URL
const option = {user: '', pass:''}
mongoose.connect(url, option)
    .then(() => {
        console.log("Database connection successful")
    }).catch((error) => {
        console.log(error)
    })


app.use("/api/v1", studentRouter)

// 404 page define
app.use("*", (req, res) => {
    res.status(404).json({
        status:"failed",
        message: "The page you are looking for was not found"
    })
})

module.exports = app