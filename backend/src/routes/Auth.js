const express = require("express") ;
const authRouter = express.Router() ;
const {register , login } = require("../controllers/userAuth") ;


authRouter.post("/register" , register ) ;
authRouter.post("/login" , login ) ;
// authRouter.post("/logout" , logout) ;
// authRouter.get("/getProfile" , getProfile ) ;


module.exports = authRouter ;