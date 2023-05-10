const router = require("express").Router();
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

const Passport = require('../models/Passport');
const { verifyTokenAndAuthorization } = require("./verifyToken");

//upload passport data
router.post('/passport/:id', verifyTokenAndAuthorization, upload.single('passFile'), async (req, res) => {
    // console.log(req.file)
    const newPassport = new Passport(
        {
            userid: req.body.userid,
            name: req.body.name,
            dateofbirth: req.body.dob,
            passportnumber: req.body.passportNumber,
            issuedate: req.body.issueDate,
            expirydate: req.body.expiryDate,
            countryofissue: req.body.countryOfIssue,
            nationality: req.body.nationality,
            passport: req.file.path


        }
    )

    try {
        const dbpassport = await Passport.findOne({userid:req.params.id})
        if(!dbpassport){

            const savedPassport = await newPassport.save();
            savedPassport && res.status(200).json(savedPassport)
        }
        else{
            res.status(400).json({message:"passport already uploaded! Try editing if you want to update the information."})
        }

    } catch (err) {
        res.status(500).json(err)
    }
});


//get passport data
router.get('/passport/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const passport = await Passport.find({ userid: req.params.id });
        passport && res.status(200).json(passport)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

//edit passport data
router.put('/passport/:id/:passportid', verifyTokenAndAuthorization, upload.single('passFile'), async (req, res) => {
    try {
        const passport = await Passport.findByIdAndUpdate(req.params.passportid,
            {
                userid: req.body.userid,
                name: req.body.name,
                dateofbirth: req.body.dob,
                passportnumber: req.body.passportNumber,
                issuedate: req.body.issueDate,
                expirydate: req.body.expiryDate,
                countryofissue: req.body.countryOfIssue,
                nationality: req.body.nationality,
                passport: req.file.path
            }, 
            { new: true });

            passport && res.status(200).json(passport);
    }
    catch (err) {
        console.log(err)
    }
});

//delete passport data
router.delete('/passport/:id/:passportid', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const passport = await Passport.findByIdAndDelete(req.params.passportid);
        passport && res.status(200).json("Deleted Successfully!")

    } catch (err) {
        console.log(err)
    }
});


module.exports = router;