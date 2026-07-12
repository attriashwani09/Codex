const mongoose = require("mongoose") ;
const { Schema } = mongoose ;

const validator = require("validator") ;

const userSchema = new Schema({

    firstName : {
        type : String , 
        minLenght : 3 , 
        maxLength : 20 , 
        required : true
    } ,

    lastName : {
        type : String , 
        minLenght : 3 , 
        maxLength : 20
    } , 

    age : {
        type : Number , 
        min : 8 , 
        max : 80 , 
        required : true 
    } , 

    emialId : {
        type : String , 
        required : true , 
        unique : true , 
        trim : true , 
        lowercase : true , 

        validate( value ) {
            if( ! validator.isEmail( value ) ) {
                throw new Error("Invalid Email Address") ;
            }
        }    
    } , 

    password : {
        type : String , 

        validate( value ) {
            if( ! validator.isStrongPassword(value) ){
                throw new Error("Password is Weak ") ;
            }
        } , 

        required : true 
    } , 

    role : {
        enum : [ 'user' , 'admin' ] , 
        default : "user" 
    }  ,

    problemsSolved : {
        type : [string]
    }

} , {timestamps : true }) ;


const User = mongoose.model("user" , userSchema ) ;

module.exports = User ;