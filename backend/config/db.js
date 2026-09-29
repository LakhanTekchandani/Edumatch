const mongoose = require('mongoose');

const connectdb =async()=>{
try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB is connected Successfully")
}
catch(err){
     console.error("MongoDB connection failed:", err.message);
     process.exit(1);
}
};

module.exports = connectdb;