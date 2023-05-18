const mongoose = require('mongoose')

const certificateSchema = mongoose.Schema(
    {
        userid:{type:String,required:true},
        name:{type:String,required:true},
        certificatename:{type:String,required:true},
        organization:{type:String,required:true},
       
        issuedate:{type:Date,required:true},
        expirydate:{type:Date,required:true},
       
        certificate:{type:String,required:true}
    },
    {timestamps:true}
);

module.exports = mongoose.model("Certificates",certificateSchema);