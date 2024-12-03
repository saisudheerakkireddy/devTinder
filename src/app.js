const express = require("express");

 const connectDB =require("./config/database.js")

const app = express();

const User = require("./models/user.js");
///changed user to User
app.use(express.json())



// app.post("/signup", async(req,res)=>{
// // creating a instance of the User model

// const user = new User({
//     firstName: "Sudheer",
//     lastName: "Akkireddy",
//     emailId: "sudheerakkireddy@gmail.com",
//     password: "7780",

// });

// await user.save();

// res.send("user added successfully")

// });

//this is for finding user id with email

app.get("/user", async (req,res) => {

    const userEmail = req.body.emailId;
    console.log(req.body)

   try{
    const user = await User.findOne({emailId : userEmail})
    console.log(user)
    res.status(200).send(user)

   }
       catch(err){

        res.status(404).send("something is wrong")
  
       }
   
       
   
})

// this is for finding all the user data available to show in feed

app.get("/feed", async (req,res)=> {
    try{  const userFeed = await User.find({}) 
    res.status(200).send(userFeed)}
    catch(err){
        res.status(404).send("cant find data")
    }
  
})

app.post("/signup", async (req,res)=> {

    //creating a new instance of user model

    const user = User(req.body)

    console.log(req.body)

    //req.body converts the json object using middleware and save it to database ,, one important point is that it only stores the data 
    //according to the defined user input schema

   
try{  
   res.send("test")

   await  user.save();}
    catch (err){
        res.status(400).send("something is wrong")
    }
 

})

// app.post("/signup", (req,res)=> {
//     const userObj = {
//         firstName: "sudheer",
//         lastName : "akkireddy"
//     }

// //creating a new User instance

// const user = new User(userObj)

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





