const router = require("express").Router();
const {verifyToken,verifyTokenAndAuthorization, verifyTokenAndAuthorizationOnlyAdmin} = require("./verifyToken");
const CryptoJS = require('crypto-js')
const User = require('../models/User')

//update user
router.put("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC_KEY).toString();
    }
   
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },{new:true});

        res.status(200).json(updatedUser);
    }catch(err){
        res.status(500).json(err);
    }
})

//delete user
router.delete("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User deleted successfully")
    }catch(err){
        console.log(err)
    }
})


//get userdata
router.get("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try{
        let userdata = await User.findById(req.params.id)
            let userdbpass = CryptoJS.AES.decrypt(userdata.password,process.env.PASS_SEC_KEY).toString(CryptoJS.enc.Utf8);
            userdata.password = userdbpass
        res.status(200).json(userdata)
    }catch(err){
        console.log(err)
    }
})

//get all users data
router.get("/allusers/:id",verifyTokenAndAuthorizationOnlyAdmin,async(req,res)=>{
    try{
        const allusersdata = await User.find();
        res.status(200).json(allusersdata)
    }catch(err){
        console.log(err)
    }
})


module.exports = router;