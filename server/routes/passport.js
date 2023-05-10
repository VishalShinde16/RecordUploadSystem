const router = require("express").Router();
const multer = require('multer')

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});
const upload = multer({storage:storage});

const Passport = require('../models/Passport');
const { verifyTokenAndAuthorization } = require("./verifyToken");


router.post('/passport', verifyTokenAndAuthorization,upload.single('passport'), async (req, res) => {
    console.log(req.file)
    const newPassport = new Passport(
        {
            userid:req.body.userid,
            name: req.body.name,
            dateofbirth: req.body.dob,
            passportnumber: req.body.passportNumber,
            issuedate: req.body.issueDate,
            expirydate: req.body.expiryDate,
            countryofissue: req.body.countryOfIssue,
            nationality:req.body.nationality,
            passport: req.file.path

           
        }
    )
    
    try{
        const savedPassport = await newPassport.save();     
        savedPassport && res.status(200).json(savedPassport)
        
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router;