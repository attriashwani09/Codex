const express = require("express") ;
const app = express() ;
require("dotenv").config() ; 
const cookieParser = require("cookie-parser") ;

const main = require("./config/database") ; 
const redisClient = require("./config/redis") ;
const authRouter = require("./routes/Auth") ;
const problemRouter = require("./routes/problem") ;

app.use( express.json() ) ;
app.use( cookieParser() ) ;

app.use( "/user" , authRouter ) ;
app.use( "/problem" , problemRouter ) ;








const InitializeConnection = async ()=>{

    try{

        await Promise.all([ main() , redisClient.connect() ]) ;
        console.log("DB connected ...... ") ;

        app.listen( process.env.PORT , ()=>{
            console.log("App listening at PORT : " + process.env.PORT ) ;
        })
    }
    catch(err ){
        console.log("Err : " + err.message ) ;
    }
}

InitializeConnection() ;
