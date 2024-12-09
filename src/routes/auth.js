const express = require("express");

const authRouter = express.Router();

const {validateSignUpData} = require("../utils/validation.js");

const bcrypt = require("bcrypt");

const User = require("../models/user.js");

const jwt = require("jsonwebtoken");








authRouter.post("/signup", async (req, res) => {

    try {
    //validate user signup data



    validateSignUpData(req);


    //encrypt the password

    const {firstName,lastName,emailId,password,age} = req.body;

    const passwordHash =  await bcrypt.hash(password,10);
    // console.log(passwordHash)


    //creating user instance updating new way

    // const user = new User(req.body)
    const user = new User({firstName, lastName, emailId, password:passwordHash, age});


        const existingUser = await User.findOne({emailId:req.body.emailId});
        if (existingUser) {
        throw new Error("Email already exists");
        }



       
        await user.save();
        res.send("user added successfully");
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(400).send("something is wrong: " + err.message);
    }
});

//above code is for signup api now this is for login api validation

authRouter.post("/login", async(req,res) => {

try {
    const {emailId,password} = req.body;

    const user = await User.findOne({emailId: emailId})
    if(!user){
        throw new Error("Invalid Credentials")
    }

     const isPasswordValid = await user.validatePassword(password);


     if(isPasswordValid){
        //creating a JWT 

        const token = await user.getJWT();
       



        //Add the token to cookie and send the response back to the user
        res.cookie("token",token,
            {expires: new Date(Date.now()+ 12 * 3600000)  //this expires cookies in 8 hours

            });
        res.send("Login Successfull!!");

     }else{
        throw new Error("Invalid credentials");
     }

    
} catch (err) {
    res.status(400).send("Something is wrong while logging in"+ err.message)
    
}


});





// authRouter.post("/logout", async (req,res) => {

//     try{
//     res.cookie("token",null,{
//         expires: new Date(Date.now())
//     });

//     catch(err){
//         throw new Error("Something is not Valid" + err.message);
//     }
// res.send("Logout successful")
// })
// module.exports = authRouter;


authRouter.post("/logout", async (req, res) => {
    try {
        // Clear the token cookie by setting it to null and expiring it immediately
        res.cookie("token", null, {
            expires: new Date(Date.now()), // Set expiration to now to delete the cookie
            httpOnly: true, // Optional: Prevents client-side access to the cookie
            secure: process.env.NODE_ENV === 'production' // Use secure cookies in production
        });

        res.send("Logout successful");
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send("Something went wrong: " + err.message); // Send a meaningful error response
    }
});

module.exports = authRouter;