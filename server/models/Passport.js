const mongoose = require('mongoose')

const passportSchema = mongoose.Schema(
    {
        userid:{type:String,required:true},
        name:{type:String,required:true},
        dateofbirth:{type:Date,required:true},
        passportnumber:{type:String,required:true},
        issuedate:{type:Date,required:true},
        expirydate:{type:Date,required:true},
        countryofissue:{type:String,required:true},
        nationality:{type:String,required:true},
        passport:{type:String,required:true}
    },
    {timestamps:true}
);

module.exports = mongoose.model("Passport",passportSchema);