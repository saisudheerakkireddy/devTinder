const express = require("express");

const app = express();

const {adminAuth, userAuth} = require("./middlewares/auth.js");

app.listen(7777, ()=>{
    console.log("server is listening at port 7777")
});

app.use("/admin",adminAuth);

app.get("/admin/getAllData", (req,res) => {
    res.send("'All Data Sent");
})

app.get("/user/data", userAuth)