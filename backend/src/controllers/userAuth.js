const User = require("../models/userSchema") ; 
const bcrypt = require("bcrypt") ;
const jwt = require("jsonwebtoken") ;
const validate = require("../utils/validate") ;
const redisClient = require("../config/redis");


const register = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    validate(req.body);

    req.body.password = await bcrypt.hash(password, 10);

    req.body.role = 'user' ;

    const user = await User.create(req.body); // create user in DB

    const token = await jwt.sign( { _id: user._id, emailId: user.emailId , role : user.role }, process.env.JWT_KEY, { expiresIn: 3600 } );

    res.cookie("token", token, { maxAge: 3600 * 1000 }); // Here we multiplied by 1000 because maxAge uses milisecond value

    res.status(201).send("User created successfully ");
  } 
  catch (err) {
    res.status(400).send("Err: " + err.message);
  }
};



const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId) {
      throw new Error("Please enter a valid email address ");
    }

    if (!password) {
      throw new Error("Please enter your password ");
    }

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("User not found");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new Error("Invalid credentials ...... ");

    const token = jwt.sign( { _id: user._id, emailId: user.emailId , role : user.role }, process.env.JWT_KEY, { expiresIn: 3600 } );

    res.cookie("token", token, { maxAge: 3600 * 1000 });

    res.status(200).send("Login Succesfully " + user.firstName);
  } 
  catch (err) {
    res.status(400).send("Err: " + err.message);
  }
}; 



const logout = async ( req , res ) => {

  try{

    const { token } = req.cookies ;
    
    const payload = jwt.verify(token, process.env.JWT_KEY);

    await redisClient.set( `token:${token}` , "Blocked" ) ;
    await redisClient.expireAt( `token:${token}` , payload.exp ) ;

    res.cookie( "token" , null , {expires : new Date( Date.now())}) ;
    res.status( 200 ).send("Logout Successfull ") ;

  }

  catch( err ){
    res.status( 400 ).send("Err : " + err.message ) ;
  }

} 


const adminRegister = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    validate(req.body);

    req.body.password = await bcrypt.hash(password, 10);

    req.body.role = 'admin' ;

    const user = await User.create(req.body); // create user in DB

    const token = await jwt.sign( { _id: user._id, emailId: user.emailId  , role : user.role }, process.env.JWT_KEY, { expiresIn: 3600 } );

    res.cookie("token", token, { maxAge: 3600 * 1000 }); // Here we multiplied by 1000 because maxAge uses milisecond value

    res.status(201).send("Admin created successfully ");
  } 
  catch (err) {
    res.status(400).send("Err: " + err.message);
  }
};




module.exports = { register , login , logout , adminRegister } ;