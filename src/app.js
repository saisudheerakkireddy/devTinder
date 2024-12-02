const express = require("express");

 const connectDB =require("./config/database.js")

const app = express();

const UserModel = require("./models/user.js");


app.post("/signup", async(req,res)=>{
// creating a instance of the User model

const user = new UserModel({
    firstName: "Sudheer",
    lastName: "Akkireddy",
    emailId: "sudheerakkireddy@gmail.com",
    password: "7780",

});

await user.save();

res.send("user added successfully")

});

// app.post("/signup", (req,res)=> {
//     const userObj = {
//         firstName: "sudheer",
//         lastName : "akkireddy"
//     }

// //creating a new UserModel instance

// const user = new UserModel(userObj)

// user.save();

// res.send("user added succesfully")

// })





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





