const express = require("express");

const app = express();

app.listen(7777, ()=>{
    console.log("server is listening at port 7777")
});

app.use("/test",(req,res)=>{
res.send("This is test")
})


app.get("/test1",(req,res)=>{
    res.send("This is req handler")
})

