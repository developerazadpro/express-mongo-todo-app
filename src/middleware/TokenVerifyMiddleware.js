const jwt = require("jsonwebtoken")

// verify token
module.exports = (req, res, next) => {
    let token = req.headers['authorization']
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err){
            res.status(401).json({
                status: "Invalid Token",
                data: err
            })
        }else{
            next() 
        }
    })
}



