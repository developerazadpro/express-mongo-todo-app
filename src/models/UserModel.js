const mongoose = require("mongoose")
const UserSchema = mongoose.Schema(
    {
        firstName: {
            type:String,
            required: true
        },
        lastName:{
            type: String,
            required:true
        },
        userName:{
            type: String,
            required:true,
            unique:true
        },
        password:{
            type: String,
            required:true,
            min: 6,
            max: 64
        },
        email:{
            type: String,
            unique: true
        },
        mobile:{
            type: String,
            unique: true
        }
    },{timestamps:true, versionKey:false}
)

const UserModel = mongoose.model('users', UserSchema)
module.exports = UserModel;