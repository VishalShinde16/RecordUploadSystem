const mongoose = require('mongoose')

const healthSchema = mongoose.Schema(
    {
        userid:{type:String,required:true,unique:true},
        name:{type:String,required:true},
        age:{type:Number,required:true},
        bloodgroup:{type:String,required:true},
        
        allergies:{type:String},
        medications:{type:String},
        vaccinations:{type:String},
        chronicconditions:{type:String},
        recenthospitalization:{type:String},
        emergencycontact:{type:String},
        additionalinformation:{type:String},
        healthrecord:{type:String}
    },
    {timestamps:true}
);

module.exports = mongoose.model("HealthRecords",healthSchema);