const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const validator = require("validator");
const cookieParser = require("cookie-parser");




app.use(express.json());

//cookie-parser middleware 
app.use(cookieParser());


const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");



app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);



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
