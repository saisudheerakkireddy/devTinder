const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const validator = require("validator");
const cookieParser = require("cookie-parser");
const userAuth = require("./middlewares/auth.js")
const cors = require("cors");




app.use(cors({
origin:"http://localhost:5173",
credentials: true,

}));
app.use(express.json());

//cookie-parser middleware 
app.use(cookieParser());


const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/user.js");



app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);



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
