const jwt = require("jsonwebtoken")

// create token
exports.createToken = (req, res) => {
    const data = {
        name: "azharul",
        desg: "software engineer"
    }
    let token = jwt.sign({
        data:data
    }, process.env.SECRET_KEY, {expiresIn: '1h'})
    res.send(token)
}

// verify token
exports.verifyToken = (req, res) => {
    let token = req.headers['authorization']
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err){
            res.status(401).json({
                status: "Invalid Token",
                data: err
            })
        }else{
            res.status(200).json({
                status: "success",
                data: decoded
            })
        }
    })
}



