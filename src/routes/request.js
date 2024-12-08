const express = require("express");

const requestRouter = express.Router();


const userAuth= require("../middlewares/auth.js");





requestRouter.post("/sendConnectionRequest", userAuth ,async(req,res)=> {


    console.log("sending a connectionrequest");
    res.send("Connection request sent")

});

module.exports = requestRouter;
