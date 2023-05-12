const router = require("express").Router();
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/healthrecords/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

const HealthRecords = require('../models/HealthRecords')

const { verifyTokenAndAuthorization } = require("./verifyToken");

//upload healthrecords data
router.post('/healthrecords/:id', verifyTokenAndAuthorization, upload.single('healthrecord'), async (req, res) => {
    // console.log(req.file)
    const newhealthrecords = new HealthRecords(
        {
            userid: req.body.userid,
            name: req.body.name,
            age: req.body.age,
            bloodgroup: req.body.bloodgroup,
            allergies: req.body.allergies,
            medications: req.body.medications,
            vaccinations: req.body.vaccinations,
            chronicconditions: req.body.chronicconditions,
            recenthospitalization: req.body.recenthospitalization,
            emergencycontact: req.body.emergencycontact,
            additionalinformation: req.body.additionalinformation,
            healthrecord: req.file.path

        }
    )

    try {
        const dbhealthrecords = await HealthRecords.findOne({ userid: req.params.id })
        if (!dbhealthrecords) {

            const savedhealthrecords = await newhealthrecords.save();
            savedhealthrecords && res.status(200).json(savedhealthrecords)
        }
        else {
            res.status(400).json({ message: "healthrecords already uploaded! Try editing if you want to update the information." })
        }

    } catch (err) {
        res.status(500).json(err)
    }
});


//get healthrecords data
router.get('/healthrecords/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const healthrecords = await HealthRecords.find({ userid: req.params.id });
        healthrecords && res.status(200).json(healthrecords)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

//edit healthrecords data
router.put('/healthrecords/:id/:healthrecordsid', verifyTokenAndAuthorization, upload.single('healthrecord'), async (req, res) => {
    try {
        const healthrecords = await HealthRecords.findByIdAndUpdate(req.params.healthrecordsid,
            {
                userid: req.body.userid,
                name: req.body.name,
                age: req.body.age,
                bloodgroup: req.body.bloodgroup,
                allergies: req.body.allergies,
                medications: req.body.medications,
                vaccinations: req.body.vaccinations,
                chronicconditions: req.body.chronicconditions,
                recenthospitalization: req.body.recenthospitalization,
                emergencycontact: req.body.emergencycontact,
                additionalinformation: req.body.additionalinformation,
                healthrecords: req.file.path
            },
            { new: true });

        healthrecords && res.status(200).json(healthrecords);
    }
    catch (err) {
        console.log(err)
    }
});

//delete healthrecords data
router.delete('/healthrecords/:id/:healthrecordsid', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const healthrecords = await HealthRecords.findByIdAndDelete(req.params.healthrecordsid);
        healthrecords && res.status(200).json("Deleted Successfully!")

    } catch (err) {
        console.log(err)
    }
});


module.exports = router;