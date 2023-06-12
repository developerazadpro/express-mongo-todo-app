const jwt = require("jsonwebtoken")

// create token
exports.issueToken = (req, res) => {
    const data = {
        name: "azharul",
        desg: "software engineer"
    }
    let token = jwt.sign({
        data:data
    }, process.env.SECRET_KEY, {expiresIn: '1h'})
    res.send(token)
}