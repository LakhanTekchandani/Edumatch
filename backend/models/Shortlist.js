const mongoose = require("mongoose");

const shortlist = new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    instituteId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Institute",
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model("Shortlist",shortlist)