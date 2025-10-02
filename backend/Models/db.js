const mongoose = require("mongoose")

const mongodb_url = process.env.mongodb_url

mongoose.connect(mongodb_url)
.then(()=>{
    console.log("mongodb database is connected")
})
.catch((err)=>{
    console.log("mongodb data having error",err)
})