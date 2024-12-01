const express = require("express");

const app = express();

app.listen(7777, ()=>{
    console.log("server is listening at port 7777")
});

// app.use("/test",(req,res)=>{
// res.send("This is test")
// })

//user, usr
app.get ("/use?r",(req,res)=>{
res.send("This is complex regex and other indicators")
})


//user, useeer
app.get ("/use+r",(req,res)=>{
    res.send("This is complex regex and plus")
    })
    
    app.get ("/user/:userId",(req,res)=>{

    console.log(req.params)
        res.send("This is complex regex and other indicators")
        })
        