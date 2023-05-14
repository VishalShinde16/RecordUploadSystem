const mongoose = require('mongoose')

const NotificationSchema = mongoose.Schema(
    {
        title:{type:String,required:true},
        description:{type:String,required:true}
    },
    {timestamps:true}
);

module.exports = mongoose.model("Notifications",NotificationSchema);