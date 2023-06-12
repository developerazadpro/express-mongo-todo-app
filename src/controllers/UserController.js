const UserModel = require("../models/UserModel")
const {hashPassword, comparePassword} = require("../helper/PasswordHelper");
const jwt = require("jsonwebtoken")

// save student
exports.createUser = async(req, res) => {

    try{
        // destructure field from request body
        const {firstName, lastName, email, mobile, userName, password} = req.body
        // validation
        if(!firstName.trim()){
            return res.json({error: "First Name is required"})
        }
        if(!lastName.trim()){
            return res.json({error: "Last Name is required"})
        }
        if(!email.trim()){
            return res.json({error: "Email is required"})
        }
        if(!mobile.trim()){
            return res.json({error: "Mobile is required"})
        }
        if(!userName.trim()){
            return res.json({error: "User Name is required"})
        }
        if(!password.trim() || password.length < 6){
            return res.json({error: "Password must be at least 6 character long"})
        }
        // hashed password
        const hashedPassword = await hashPassword(password);

        // check if user exist
        const existingUser = await UserModel.findOne({userName})
        if(existingUser){
            return res.json({error: "User Name is already taken"})
        }
        const user = new UserModel({
            firstName,
            lastName,
            email,
            mobile,
            userName,
            password:hashedPassword
        })
        //return res.json({user})
        const savedUser = await user.save()
        if(savedUser){
            res.status(200).json({
                status: "success",
                data: savedUser
            })
        }
    }catch(error){
        console.log("Error creating user", error)
        res.status(200).json({
            status: "failed",
            data: "Error creating User"
        })
    }
} 

exports.login = async (req, res) => {
    try{
        // destructure field from request body
        const {userName, password} = req.body
        // validation
        if(!userName.trim()){
            return res.json({error: "User Name is required"})
        }
        if(!password.trim()){
            return res.json({error: "Password is required"})
        }

        // check if user exist
        const user = await UserModel.findOne({userName})
        if(!user){
            return res.json({error: "User not found"})
        }
        // compare password
        const match = await comparePassword(password, user.password);
        if(!match){
            return res.json({error: "Invalid username of password"})
        }

        const token = jwt.sign(
            {_id:user._id},
            process.env.PRIVATE_KEY,
            {expiresIn: '1h'}
        )
        
        res.status(200).json({
            status: "success",
            data: user,
            token
        })
        
    }catch(error){
        console.log("Error login", error)
        res.status(200).json({
            status: "failed",
            data: "login error"
        })
    }
}

// read students 
/*
exports.getAllStudents = async(req, res) => {
    const query = {}
    const projection = "name class"
    try{
        const students = await StudentsModel.find(query, projection,{})
        if(students){
            res.status(200).json({
                status: "success",
                data: students
            })
        }else{
            res.status(200).json({
                status: "success",
                data: "Data not found"
            })
        }
    }catch(error){
        console.log("Error fetching students", error)
        res.status(200).json({
            status: "success",
            data: "Data not found"
        })
    }
}

// read single student
exports.getStudent = async(req, res) => {
    try{
        const student = await StudentsModel.findById(req.params.id)
        if(student){
            res.status(200).json({
                status: "success",
                data: student
            })
        }else{
            res.status(200).json({
                status: "success",
                data: "Data not found"
            })
        }
    }catch(error){
        console.log("Error fetching student", error)
        res.status(200).json({
            status: "success",
            data: "Data not found"
        })
    }
}

// update single student
exports.updateStudent = async(req, res) => {
    try{
        const student = await StudentsModel.findByIdAndUpdate(req.params.id, req.body)
        if(student){
            res.status(200).json({
                status: "success",
                data: student
            })
        }
    }catch(error){
        console.log("Error updating student", error)
        res.status(200).json({
            status: "failed",
            data: "Error updating student"
        })
    }
}

// delete student
exports.deleteStudent = async(req, res) => {
    try{
        const student = await StudentsModel.findByIdAndDelete(req.params.id)
        if(student){
            res.status(200).json({
                status: "success",
                data: "student deleted"
            })
        }else{
            res.status(200).json({
                status: "success",
                data: "Data not found"
            })
        }
    }catch(error){
        console.log("Error deleting student", error)
        res.status(200).json({
            status: "success",
            data: "Error deleting student"
        })
    }
}
*/
