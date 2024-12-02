const express = require("express");

 const connectDB =require("./config/database.js")

const app = express();

connectDB()
    .then(()=> {
        console.log("Database connection established!!!");
        app.listen(7777, ()=>{
            console.log("server is listening at port 7777")
        });
        
    })
    .catch(()=> {
        console.error(" Database cannot be connected")
    });





