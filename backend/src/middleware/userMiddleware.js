const jwt = require("jsonwebtoken") ;
const User = require("../models/userSchema") ;
const redisClient = require("../config/redis") ;


const userMiddleware = async ( req , res , next ) =>{ 

   try{

    const { token } = req.cookies ;

    if (!token)
        throw new Error("Authentication required");

    const payload = jwt.verify( token , process.env.JWT_KEY ) ;

    const { _id } = payload ; 

    if (!_id)
        throw new Error(" User doesn't exist ");

    const result = await User.findById( _id ) ;

    if( !result )
        throw new Error(" User doesn't exist ") ;

    const isBlocked = await redisClient.exists(`token:${token}`) ;

   if (isBlocked)
        throw new Error("Session expired. Please login again.");


    req.result = result ;

    next() ;

   }
   catch( err ){
    res.status( 400 ).send("Err : " + err.message ) ;
   }

} 



module.exports = userMiddleware ;