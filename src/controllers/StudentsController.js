const StudentsModel = require("../models/StudentsModel")

// save student
exports.saveStudent = async(req, res) => {
    try{
        const student = new StudentsModel(req.body)
        const savedStudent = await student.save()
        if(savedStudent){
            res.status(200).json({
                status: "success",
                data: savedStudent
            })
        }else{
            console.log("Error saving student", error)
            res.status(200).json({
                status: "failed",
                data: "Error Saving Student"
            })
        }
    }catch(error){
        console.log("Error saving student", error)
        res.status(200).json({
            status: "failed",
            data: "Error Saving Student"
        })
    }
} 


// read students 
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
