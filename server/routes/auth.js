const router = require('express').Router();
const User = require('../models/User')

const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken')

//User Registration
router.post("/register",async(req,res)=>{

    const newUser = new User({
    
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt((req.body.password),process.env.PASS_SEC_KEY).toString(),
        department:req.body.department,
        jobtitle:req.body.jobtitle
    })

    try{
        const user = await User.findOne({email:req.body.email})
        if(!user){
            const saveduser = await newUser.save();
            res.status(200).json(saveduser);
        }
        else{
            res.status(401).json("user already exist");
        }
    }catch(err){
        res.status(500).json(err);
    }

});


//user login
router.post("/login",async(req,res)=>{

    const userEmail = req.body.email;
    const userPassword = (req.body.password).toString();

    try{
        const user = await User.findOne({email:userEmail});

        if(!user){
            res.status(401).json("Invalid Credentials");
            return;
        }else{
            const userdbpass = CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC_KEY).toString(CryptoJS.enc.Utf8);
            const {password,...others} = user._doc; 
            const accessToken = jwt.sign(
                {
                    id:user._id,
                    isAdmin:user.isAdmin
                },
                process.env.JWT_KEY,
                {expiresIn:'30d'}
            )
            userPassword !== userdbpass ? res.status(401).json("Invalid Credentials"): res.status(200).json({...others,accessToken});
        }


    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;