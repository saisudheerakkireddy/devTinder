const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const validator = require("validator");
const bcrypt = require("bcrypt");
const {validateSignUpData} = require("./utils/validation.js")
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth.js");

// to implement strict checks for user input data(post, patch)
const User = require("./models/user.js");

app.use(express.json());

//cookie-parser middleware 
app.use(cookieParser());




app.post("/signup", async (req, res) => {

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

app.post("/login", async(req,res) => {

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

app.get("/profile", userAuth,async (req,res)=> {

try{
    
  


    const user = req.user;
   
   

res.send(user);


} catch(err){
    res.status(400).send("ERROR "+ err.message);

}

});

app.post("/sendConnectionRequest", userAuth ,async(req,res)=> {


    console.log("sending a connectionrequest");
    res.send("Connection request sent")

})

connectDB()
    .then(() => {
        console.log("Database connection established!!!");
        app.listen(7777, () => {
            console.log("server is listening at port 7777");
        });
    })
    .catch((err) => {
        console.error("Database cannot be connected: " + err.message);
    });
