const { getLanguageById , submitBatch , submitToken } = require("../utils/problemUtility") ;
const problem = require("../models/problemSchema") ;



// 1). createProblem in DB ( by admin only )
const createProblem = async( req , res ) => {

    const { title , description , difficulty , tags , visibleTestCases , hiddenTestCases , startCode , referenceSolution , problemCreator  }  =  req.body ;


    try{

        for( const { language , completeCode}  of referenceSolution ){

            const languageId = getLanguageById( language ) ;
            
            const submissions = visibleTestCases.map( (testcase ) => {
                return {
                    source_code : completeCode , 
                    language_id : languageId , 
                    stdin : testcase.input , 
                    expected_output : testcase.output 
                }
            }) 

            console.log( submissions ) ;
            const submitResult = await submitBatch( submissions ) ;   

            const resultToken = submitResult.map( (value) => value.token ) ;

            const testResult = await submitToken( resultToken ) ;

            for( const test of testResult ){

                if( test.status_id != 3 )
                    throw new Error("Error Ocuuered ...... ") ;
            } 
 

        } 

        // after clearing all test cases , now we can create the problem in database 
        await problem.create( { ...req.body , problemCreator : req.result._id }) ;
        res.status( 201 ).send("Problem saved successfully ") ;

    } 
    catch( err ){
        res.status( 400 ).send("Err : " + err.message ) ;
    }
} ; 



module.exports = { createProblem }