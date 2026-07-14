const express = require("express") ;
const problem = require("../models/problemSchema");
const problemRouter = express.Router() ;  

const adminMiddleware = require("../middleware/adminMiddleware") ;
const {createProblem } = require("../controllers/userProblem") ;

// 1). To add a problem
problemRouter.post("/create" , adminMiddleware , createProblem ) ;

// 2). To update a problem
// problemRouter.patch("/:id" , adminMiddleware , updateProblem ) ;

// 3). to delete a Problem
// problemRouter.delete("/:id" , adminMiddleware , deleteProblem ) ;

    // 4). to fetch one problem by its id
// problemRouter.get("/:id" , getProblemById ) ;

// 5). to fetch all the possible problems 
// problemRouter.get("/" , getAllProblems ) ;

// 6). to fetch solved Problems only 
// problemRouter.get("/user" , solvedProblem ) ; 



module.exports = problemRouter ;