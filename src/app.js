const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const validator = require("validator");
const bcrypt = require("bcrypt");
const {validateSignUpData} = require("./utils/validation.js")

// to implement strict checks for user input data(post, patch)
const User = require("./models/user.js");
app.use(express.json());




app.post("/signup", async (req, res) => {

    try {
    //validate user signup data



    validateSignUpData(req);


    //encrypt the password

    const {firstName,lastName,emailId,password,age} = req.body;

    const passwordHash =  await bcrypt.hash(password,10);
    console.log(passwordHash)


    //creating user instance updating way

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

//above code is for signup api






// this is for adding custom validators into schema
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    const data = req.body;
    
    try {
        const ALLOWED_UPDATES = ["photoUrl", "about", "skills"];
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

        if (!isUpdateAllowed) {
            throw new Error("Update not allowed");
        }

        // Use 'new: true' to return the updated document
        const user = await User.findByIdAndUpdate(userId, data, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).send("User not found");
        }

        console.log(user);
        res.send(user);
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).send("something is wrong: " + err.message);
    }
});

// this is for finding user id with email
app.get("/user", async (req, res) => {
    const userEmail = req.query.emailId; // Changed to query parameter
    console.log(req.query);

    try {
        const user = await User.findOne({ emailId: userEmail });
        
        if (!user) {
            return res.status(404).send("User not found");
        }

        console.log(user);
        res.status(200).send(user);
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).send("something is wrong: " + err.message);
    }
});

// this is for finding all the user data available to show in feed
app.get("/feed", async (req, res) => {
    try {
        const userFeed = await User.find({});
        res.status(200).send(userFeed);
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).send("can't find data: " + err.message);
    }
});

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


  