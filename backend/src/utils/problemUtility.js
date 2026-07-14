const axios = require("axios") ;


// 1). To get languageId
const getLanguageById = ( lang ) => {

    const language = {
        "cpp" : 54 , 
        "java" : 62 , 
        "javascript" : 63
    } 

    return language[ lang.toLowerCase() ] ;
}  



// 2). Submit multiple test cases together for faster execution.
const submitBatch = (submissions) => {

  const options = {
    method: "POST",
    url: "https://ce.judge0.com/submissions/batch",
    params: {
      base64_encoded: "false",
      wait: "false",
    },
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      submissions , 
    },
  };

  async function fetchData() {
    try {
        
      const response = await axios.request(options);
      return response.data;

    } 
    catch (err) {
        throw new Error(JSON.stringify(err.response?.data));
    }
  }

  return fetchData();   // runs the code and sends array of objects tokens as output
}; 



// 3). just used to wait for 1 sec , in submittoken
const waiting = (timer) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timer);
    });
};




// 4) Fetches the execution results of submitted Judge0 tokens.
const submitToken = async (resultToken) => {

    const options = {
        method: "GET",
        url: "https://ce.judge0.com/submissions/batch",

        params: {
            tokens: resultToken.join(","),
            base64_encoded: "false",
            fields: "*"
        },

        headers: {
            "Content-Type": "application/json"
        }
    };

    async function fetchData() {
        try {
            const response = await axios.request(options);
            return response.data;
        }
        catch (err) {
            throw new Error(err.response?.data || err.message);
        }
    }

    while( true ){

        const result = await fetchData() ;   // chck doc : result have an ojject submissions which have info aboult all the tokens that we sent 

        const isAllowed = result.submissions.every( (r) => r.status_id > 2 ) ;

        if( isAllowed )
            return result.submissions ;

        await waiting( 1000 ) ; // else wait for 1 sec 
    }
};





module.exports = { getLanguageById , submitBatch  , submitToken } ; 





