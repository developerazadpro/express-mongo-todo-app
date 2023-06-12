const mongoose = require("mongoose")
const StudentSchema = mongoose.Schema(
    {
        name: {
            type:String,
            required: true
        },
        class:{
            type: String,
            required:true
        },
        roll:{
            type: Number,
            required:true,
            min:[1, 'Min 1 & Max 100, but supplied value is = {VALUE}'],
            max:[100, 'Min 1 & Max 100, but supplied value is = {VALUE}'],
            validate:{
                validator: function(value){
                    if(value.lenght <= 0 || value.lenght >=100){
                        return false;
                    }else{
                        return true
                    }
                },
                message: '1 to 100 range roll required'
            }
        },
        remarks:{
            type: String
        }
    },{timestamps:true, versionKey:false}
)

const StudentsModel = mongoose.model('students', StudentSchema)
module.exports = StudentsModel;