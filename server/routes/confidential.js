const router = require('express').Router();
const Confidential = require('../models/Confidential')
const { verifyTokenAndAuthorizationOnlyAdmin } = require("./verifyToken");
const CryptoJS = require('crypto-js');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/confidential')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });



//add data
router.post('/addconf/:id', verifyTokenAndAuthorizationOnlyAdmin, upload.single('confFile'), async (req, res) => {

    if (req.file) {

        const newConf = new Confidential(
            {
                title: req.body.title,
                description: CryptoJS.AES.encrypt((req.body.description), process.env.PASS_SEC_KEY).toString(),
                confFile: CryptoJS.AES.encrypt((req.file.path), process.env.PASS_SEC_KEY).toString()
            }
        )

        try {
            const confdata = await newConf.save();
            confdata && res.status(200).json("Data added successfully!")

        } catch (err) {
            res.status(500).json(err)
        }
    }
});


//get data

router.post('/getconf/:id', verifyTokenAndAuthorizationOnlyAdmin, async (req, res) => {
    try {
        if (req.body.secretkey === process.env.CONF_KEY) {
            const alldata = await Confidential.find();

            const newalldata = alldata.map((data) => {
                return {
                    ...data._doc,
                    description: CryptoJS.AES.decrypt(data.description, process.env.PASS_SEC_KEY).toString(CryptoJS.enc.Utf8),
                    confFile: CryptoJS.AES.decrypt(data.confFile, process.env.PASS_SEC_KEY).toString(CryptoJS.enc.Utf8)
                }
            })
            newalldata && res.status(200).json(newalldata)
        }
        else {
            res.status(401).json("Invalid Secret Key");
        }

    } catch (err) {
        console.log(err)
    }
})


//delete
router.delete('/:id/:docid', verifyTokenAndAuthorizationOnlyAdmin, async (req, res) => {
    const docid = req.params.docid;
    try {
        const resp = await Confidential.findByIdAndDelete(docid);
        resp && res.status(200).json("Document Deleted Successfully!")
    } catch (err) {
        console.log(err)
    }
})
module.exports = router;