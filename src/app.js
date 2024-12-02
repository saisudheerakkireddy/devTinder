const express = require("express");

const app = express();

app.listen(7777, ()=>{
    console.log("server is listening at port 7777")
});

// app.use("/test",(req,res)=>{
// res.send("This is test")
// })

//user, usr
// app.get ("/use?r",(req,res)=>{
// res.send("This is complex regex and other indicators")
// })


// //user, useeer
// app.get ("/use+r",(req,res)=>{
//     res.send("This is complex regex and plus")
//     })
    
//     app.get ("/user/:userId",(req,res)=>{

//     console.log(req.params)
//         res.send("This is complex regex and other indicators")
//         })

        app.use("/user",(req,res,next) => {
            console.log("This is route handler 1");

        // res.send("1st response")
        next();

        },
    (req,res,next)=> {
        // console.log("this is 2nd route handler")
// res.send("2nd response")
next();

    },
    (req,res,next) => {
        next();
        console.log("this is 3rd route handler")
       
        // res.send("3rd response");
   
    },
    (req,res,next) => {
        res.send(`${console.error}`);
        
    }

)
      