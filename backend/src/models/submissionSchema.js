const mongoose = require("mongoose") ;
const problem = require("./problemSchema");
const { Schema } = mongoose ;


const submissionSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    problemId: {
        type: Schema.Types.ObjectId,
        ref: "problem",
        required: true
    },

    code: {
        type: String,
        required: true
    },

    language: {
        type: String,
        enum: ["cpp", "java", "javascript"],
        required: true
    },

    status: {
        type: String,
        enum: [
            "pending",
            "accepted",
            "Wrong Answer" , 
            "error"
        ],
        default: "pending"
    },

    runtime: {
        type: Number,
        default: 0
    },

    memory: {
        type: Number,
        default: 0
    },

    errorMessage: {
        type: String,
        default: ""
    },

    testCasesPassed: {
        type: Number,
        default: 0
    },

    testCasesTotal: {
        type: Number,
        default: 0
    }

}, { timestamps: true }); 



// this will create a compound index of userId and problemId and will help fetch submissions in log(n) time .
// here 1 means ascending order , ( to make it in descending order use -1 ) .
submissionSchema.index({ userId : 1 , problemId : 1}) ; 


const Submission = mongoose.model("submission" , submissionSchema ) ; 



module.exports = Submission ;