const mongoose = require('mongoose')

const confidentialSchema = mongoose.Schema(
    {
        title:{type:String},
        description:{type:String},
        confFile:{type:String}
    },
    {timestamps:true}
);

module.exports = mongoose.model("Confidential",confidentialSchema);