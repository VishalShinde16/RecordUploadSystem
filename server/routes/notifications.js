const router = require('express').Router();
const Notifications = require('../models/Notifications')
const {verifyTokenAndAuthorizationOnlyAdmin, verifyTokenAndAuthorization}  = require('./verifyToken')

router.post('/addnotice/:id',verifyTokenAndAuthorizationOnlyAdmin,async(req,res)=>{

    const newNotification = new Notifications(
        {
            title:req.body.title,
            description:req.body.description,
        }
    )

    try{
        await newNotification.save();
        res.status(200).json("Notice sent successfully!")
    }catch(err){
        console.log(err)
    }

});

router.get('/getnotice/:id',verifyTokenAndAuthorization,async(req,res)=>{

    try{
        const notices = await Notifications.find();
        res.status(200).json(notices)
    }catch(err){
        console.log(err)
    }
});


router.delete('/deletenotice/:id',verifyTokenAndAuthorizationOnlyAdmin,async(req,res)=>{
        const id = req.body.id;
        try{
            await Notifications.findByIdAndDelete(id);
            res.status(200).json("Notice deleted successfully!")
        }catch(err){
            console.log(err)
        }
    }    
)

module.exports = router;
