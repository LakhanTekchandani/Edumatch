const mongoose = require('mongoose');

const instituteSchema = new mongoose.Schema({
    userid:{    
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
        unique:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    city:{
        type:String,
        required:true,
        trim:true
    },
    location:{
        type:String,
        required:true,
        trim:true
    },
    mode:{
        type:String,
        enum:["online","offline","both"],
        required:true
    },
    verificationStatus:{
        type:String,
        enum:["unverified","pending","verified","rejected"],
        required:true,
        default:"unverified"
    },
    examsCourses: {
      type: [String],
      default: []
    },

    feesRange: {
      type: String,
      trim: true
    },

    facilities: {
      type: [String],
      default: []
    },
    batchInfo: {
      type: String,
      trim: true
    },

    contactInfo: {
      type: String,
      trim: true
    },

    photos: {
      type: [String],
      default: []
    }
    
},
{
    timestamps:true
}
)

module.exports = mongoose.model("Institute",instituteSchema)