const mongoose = require('mongoose');

const studentassociation = new mongoose.Schema({
    Studentid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user",
    },
    instituteid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Institute",
    },
    studentemail:{
        type:String,
        required:true
    },
    courseExam:{
        type:String,
        required:true
    },
    batchYear:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"inactive"
    }
},
{
    timestamps:true
}
)

module.exports=mongoose.model("StudentAssociation",studentassociation);