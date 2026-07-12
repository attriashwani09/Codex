const User = require("../models/userSchema") ; 
const bcrypt = require("bcrypt") ;
const jwt = require("jsonwebtoken") ;
const validate = require("../utils/validate") ;


const register = async ( req , res ) =>{

    try{
    const { emailId , password } = req.body ;

    validate( req.body ) ; 

    req.body.password = await bcrypt.hash( password , 10 ) ; 

    const user = await User.create( req.body ) ;  // create user in DB 

    const token = await jwt.sign({ _id : user._id , emailId : user.emailId } , process.env.JWT_KEY  , {expiresIn : 3600 }) ;

    res.cookie("token" , token , {maxAge : 3600 * 1000 }) ; // Here we multiplied by 1000 because maxAge uses milisecond value

    res.status( 201 ).send("User created successfully ..... ") ; 

    } 
    catch( err ){
        res.send("Err : " + err.message ) ;
    }
    
}  


const login = async ( req , res ) =>{ 

    try{

    const { emailId , password } = req.body ;

    if( !emailId ){
        throw new Error("Please enter a valid email address ") ;
    } 

    if( !password ){
        throw new Error("Please enter your password ") ;
    }  

    const  user = await User.findOne({ emailId : emailId }) ; 

    const match = bcrypt.compare( user.password , password ) ;

    if( !match )
        throw new Error("Invalid credentials ...... ") ;

    const token = jwt.sign({ _id : user._id , emailId : user.emailId }  , process.env.JWT_KEY  , {expiresIn : 3600 }) ;

    res.cookie( "token" , token , { maxAge : 3600 * 1000 }) ;

    res.status(200).send("Login Succesfully ....... " + user.firstName ) ;

    } 
    catch( err ){
        res.send("Err : " + err.message ) ;
    }
}




module.exports = { register , login } ;