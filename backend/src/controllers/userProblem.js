const { getLanguageById , submitBatch } = require("../utils/problemUtility") ;




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

            const submitResult = await submitBatch( submissions ) ; 

        }
    } 
    catch( err ){
        res.send("Err : " + err.message ) ;
    }
} ;