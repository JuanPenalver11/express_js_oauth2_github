import mongoose from "mongoose";


const GithubUserModel = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    githubID:{
        type:String,
        required:true,
        unique:true
    }
})

export const GitHubModel = mongoose.model('GitHubModel', GithubUserModel)