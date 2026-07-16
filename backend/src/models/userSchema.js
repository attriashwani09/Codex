const mongoose = require("mongoose") ;
const { Schema } = mongoose ;

const userSchema = new Schema({

    firstName : {
        type : String , 
        minLength : 3 , 
        maxLength : 20 , 
        required : true
    } ,

    lastName : {
        type : String , 
        minLength : 3 , 
        maxLength : 20
    } , 

    age : {
        type : Number , 
        min : 8 , 
        max : 80 , 
        required : true 
    } , 

    emailId : {
        type : String , 
        required : true , 
        unique : true , 
        trim : true , 
        lowercase : true , 

    } , 

    password : {
        type : String , 
        required : true 
    } , 

    role : {
        type : String ,
        enum : [ 'user' , 'admin' ] , 
        default : "user" 
    }  ,

    problemsSolved : {
        type : [{
            type : Schema.Types.ObjectId , 
            ref : "problem"
        }] , 
        default : []
        
        // unique : true 
    }

} , {timestamps : true }) ; 

// when any user profile will get deleted , it will automatically delete all its submissions 
userSchema.post("findOneAndDelete" , async function ( doc ) {

    if( doc ){
        await mongoose.model("submission").deleteMany({userId : doc._id }) ;
    }
    
})


const User = mongoose.model("user" , userSchema ) ;

module.exports = User ;