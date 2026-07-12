const express = require("express") ;
const app = express() ;
require("dotenv").config() ; 
const cookieParser = require("cookie-parser") ;

const main = require("./config/database") ; 
const authRouter = require("./routes/Auth") ;

app.use( express.json() ) ;
app.use( cookieParser() ) ;

app.use( "/auth" , authRouter ) ;





main()
.then( ()=> {
    console.log("MongoDb Connected .... " );
    app.listen( process.env.PORT , ()=>{
        console.log("App is listening at PORT : " + process.env.PORT ) ;
    })
}) 
.catch( (err) => {
    console.log("Err : " + err.message ) ;
}) 
