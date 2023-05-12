const mongoose = require('mongoose')

const visaSchema = mongoose.Schema(
    {
        userid:{type:String,required:true,unique:true},
        name:{type:String,required:true},
        dateofbirth:{type:Date,required:true},
        visatype:{type:String,required:true},
        visanumber:{type:String,required:true,unique:true},
        passportnumber:{type:String,required:true,unique:true},
        issuedate:{type:Date,required:true},
        expirydate:{type:Date,required:true},
        countryofissue:{type:String,required:true},
        nationality:{type:String,required:true},
        visa:{type:String,required:true}
    },
    {timestamps:true}
);

module.exports = mongoose.model("Visa",visaSchema);