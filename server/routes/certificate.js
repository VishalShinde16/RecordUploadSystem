const router = require("express").Router();
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/certificates/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

const Certificates = require('../models/Certificates')

const { verifyTokenAndAuthorization } = require("./verifyToken");

//upload certificate data
router.post('/certificate/:id', verifyTokenAndAuthorization, upload.single('certificate'), async (req, res) => {
    // console.log(req.file)
    const newCertificate = new Certificates(
        {
            userid: req.body.userid,

            certificatename: req.body.certificatename,
            organization: req.body.organization,

            issuedate: req.body.issueDate,
            expirydate: req.body.expiryDate,

            certificate: req.file.path


        }
    )

    try {
        const savedcertificate = await newCertificate.save();
        savedcertificate && res.status(200).json(savedcertificate)
    } catch (err) {
        res.status(500).json(err)
    }
});


//get all certificates of specific user
router.get('/certificate/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const certificate = await Certificates.find({ userid: req.params.id });
        certificate && res.status(200).json(certificate)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

//edit certificate data
// router.put('/certificate/:id/:certificateid', verifyTokenAndAuthorization, upload.single('certificate'), async (req, res) => {
//     try {
//         const certificate = await certificate.findByIdAndUpdate(req.params.certificateid,
//             {
//                 userid: req.body.userid,

//                 certificatename: req.body.certificatename,
//                 organization: req.body.organization,

//                 issuedate: req.body.issueDate,
//                 expirydate: req.body.expiryDate,

//                 certificate: req.file.path
//             },
//             { new: true });

//         certificate && res.status(200).json(certificate);
//     }
//     catch (err) {
//         console.log(err)
//     }
// });

//delete certificate data
router.delete('/certificate/:id/:certificateid', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const certificate = await Certificates.findByIdAndDelete(req.params.certificateid);
        certificate && res.status(200).json("Deleted Successfully!")

    } catch (err) {
        console.log(err)
    }
});




module.exports = router;