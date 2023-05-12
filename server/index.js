const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')

const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const passportRoute = require('./routes/passport')
const visaRoute = require('./routes/visa')
const certificatesRoute = require('./routes/certificate')
const healthrecordsRoute = require('./routes/healthrecords')

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database connection successful")
}).catch((err)=>{
    console.log(err)
})

app.use(express.json());
app.use(cors());

app.use("/user",userRoute);
app.use("/auth",authRoute);
app.use("/upload",passportRoute);
app.use("/uploadvisa",visaRoute);
app.use("/uploadcertificates",certificatesRoute);
app.use("/uploadhealthrecords",healthrecordsRoute);

app.use('/uploads',express.static('uploads'))


app.listen(process.env.PORT || 5000,()=>{
    console.log("Server is running on port 5000")
})


