
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type: String, 
        required:true,
        maxlength: 15,
        minlength: 3
    },
    surname:{
        type:String,
        required:true
    },
    email:{
        type:String, 
        required:true,
    },
    password:{
        type: String, 
        required:true
    },
    // misReservas:{
    //     type: Array
    //     [jhdsfsjd763792, 874368943kjfdskj8, ]
    // }
    // role:{
    //     type: Number,
    //     default:0
    // }
    //0 - user normal
    //1 - vendedor
    //2- admin
}, {
    timestamps:true
})


module.exports = mongoose.model("User", userSchema)



