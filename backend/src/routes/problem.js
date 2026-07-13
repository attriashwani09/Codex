const express = require("express") ;
const problem = require("../models/problemSchema");
const problemRouter = express.Router() ; 

// 1). To add a problem
problemRouter.post("/create" , problemCreate ) ;

// 2). To update a problem
problemRouter.patch("/:id" , problemUpdate ) ;

// 3). to delete a Problem
problemRouter.delete("/:id" , problemDelete ) ;

// 4). to fetch one problem by its id
problemRouter.get("/:id" , problemFetch ) ;

// 5). to fetch all the possible problems 
problemRouter.get("/" , fetchAllProblem ) ;

// 6). to fetch solved Problems only 
problemRouter.get("/user" , solvedProblem ) ;