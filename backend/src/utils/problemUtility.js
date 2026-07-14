const axios = require("axios") ;



const getLanguageById = ( lang ) => {

    const language = {
        "c++" : 54 , 
        "java" : 62 , 
        "javascript" : 63
    } 

    return language[ lang.toLowerCase() ] ;
}  




const submitBatch = (submissions) => {

  const options = {
    method: "POST",
    url: "https://ce.judge0.com/submissions/batch",
    params: {
      base64_encoded: "false",
      wait: "true",
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
    } catch (err) {
      throw new Error(err.response?.data || err.message);
    }
  }

  return fetchData();
};





module.exports = { getLanguageById , submitBatch } ; 





