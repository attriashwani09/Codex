const validator = require("validator") ;

const validate = ( data ) => { 

    const { firstName , emailId , password } = data ;

    const mandatoryFields = ["firstName", "emailId", "password" ];

    const isAllowed = mandatoryFields.every( ( field ) =>  Object.keys( data ).includes( field )  );

    if( !isAllowed ){
        throw new Error("Some credentials missing .... ") ;
    } 

    if( !validator.isEmail( emailId ))
        throw new Error("Invalid Email address ") ;

    if( !validator.isStrongPassword( password )) 
        throw new Error("Password is too weak ") ;

} 



module.exports = validate ;