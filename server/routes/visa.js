const router = require("express").Router();
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/visa/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

const Visa = require('../models/Visa')

const { verifyTokenAndAuthorization, verifyTokenAndAuthorizationOnlyAdmin } = require("./verifyToken");

//upload visa data
router.post('/visa/:id', verifyTokenAndAuthorization, upload.single('visa'), async (req, res) => {
    // console.log(req.file)
    const newVisa = new Visa(
        {
            userid: req.body.userid,
            name: req.body.name,
            dateofbirth: req.body.dob,
            visatype:req.body.visatype,
            visanumber:req.body.visanumber,
            passportnumber: req.body.passportNumber,
            issuedate: req.body.issueDate,
            expirydate: req.body.expiryDate,
            countryofissue: req.body.countryOfIssue,
            nationality: req.body.nationality,
            visa: req.file.path


        }
    )

    try {
        const dbvisa = await Visa.findOne({userid:req.params.id})
        if(!dbvisa){

            const savedvisa = await newVisa.save();
            savedvisa && res.status(200).json(savedvisa)
        }
        else{
            res.status(400).json({message:"visa already uploaded! Try editing if you want to update the information."})
        }

    } catch (err) {
        res.status(500).json(err)
    }
});


//get visa data
router.get('/visa/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const visa = await Visa.find({ userid: req.params.id });
        visa && res.status(200).json(visa)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

//edit visa data
router.put('/visa/:id/:visaid', verifyTokenAndAuthorization, upload.single('visa'), async (req, res) => {
    try {
        const visa = await Visa.findByIdAndUpdate(req.params.visaid,
            {
                userid: req.body.userid,
                name: req.body.name,
                dateofbirth: req.body.dob,
                visatype:req.body.visatype,
                visanumber:req.body.visanumber,
                passportnumber: req.body.passportNumber,
                issuedate: req.body.issueDate,
                expirydate: req.body.expiryDate,
                countryofissue: req.body.countryOfIssue,
                nationality: req.body.nationality,
                visa: req.file.path
            }, 
            { new: true });

            visa && res.status(200).json(visa);
    }
    catch (err) {
        console.log(err)
    }
});

//delete visa data
router.delete('/visa/:id/:visaid', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const visa = await Visa.findByIdAndDelete(req.params.visaid);
        visa && res.status(200).json("Deleted Successfully!")

    } catch (err) {
        console.log(err)
    }
});

//get all visa data
router.get('/allvisa/:id', verifyTokenAndAuthorizationOnlyAdmin, async (req, res) => {
    try {
        const visa = await Visa.find();
        visa && res.status(200).json(visa)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

module.exports = router;