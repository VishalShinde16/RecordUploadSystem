const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token;
 
    if(authHeader){
        const mytoken = authHeader.split(" ")[1];
       
        jwt.verify(mytoken,process.env.JWT_KEY,(err,user)=>{
            
            if(err) res.status(403).json("Token is invalid")
            req.user = user;
            // console.log("user : ",user)
            next();
        });
    }else{
        return res.status(401).json("You are not authenticated")
    }

}

const verifyTokenAndAuthorization = (req,res,next)=>{

    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            
            next();
        }else{
            res.status(403).json("You are not allowed to do that!");
        }
    });
}

const verifyTokenAndAuthorizationOnlyAdmin = (req,res,next)=>{

    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You are not allowed to do that!");
        }
    });
}
module.exports = {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAuthorizationOnlyAdmin}