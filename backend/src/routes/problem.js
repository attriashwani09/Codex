const express = require("express") ;
const problem = require("../models/problemSchema");
const problemRouter = express.Router() ;  

const adminMiddleware = require("../middleware/adminMiddleware") ;
const userMiddleware = require("../middleware/userMiddleware") ;
const {createProblem , updateProblem , deleteProblem , getProblemById , getAllProblems } = require("../controllers/userProblem") ;

// 1). To add a problem
problemRouter.post("/create" , adminMiddleware , createProblem ) ;

// 2). To update a problem
problemRouter.put("/update/:id" , adminMiddleware , updateProblem ) ;

// 3). to delete a Problem
problemRouter.delete("/delete/:id" , adminMiddleware , deleteProblem ) ;

    // 4). to fetch one problem by its id
problemRouter.get("/problemById/:id" , userMiddleware , getProblemById ) ;

// 5). to fetch all the possible problems 
problemRouter.get("/getAllProblem" , userMiddleware ,  getAllProblems ) ;

// 6). to fetch solved Problems only 
// problemRouter.get("/ProblemSolvedByUser/user" , solvedProblem ) ; 



module.exports = problemRouter ;