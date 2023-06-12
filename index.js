const app = require("./app")
const dotenv = require("dotenv")
dotenv.config({path: './.env'})
const port = process.env.PORT


// Run server
app.listen(port, (req, res) => {
    console.log(`Server listening on port ${port}`)
})

