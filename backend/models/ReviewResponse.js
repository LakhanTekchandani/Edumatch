const mongoose = require("mongoose");

const reviewResponse = new mongoose.Schema({
    reviewId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review",
        required:true
    },
    instituteId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Institute",
        required:true
    },
    responseText:{
        type:String,
        required:true
    },

}, {timestamps:true})

module.exports=mongoose.model("ReviewResponse",reviewResponse)