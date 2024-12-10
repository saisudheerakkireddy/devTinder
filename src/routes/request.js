const express = require("express");
const requestRouter = express.Router();
const userAuth= require("../middlewares/auth.js");
const ConnectionRequest = require("../models/ConnectionRequest.js");




requestRouter.post("/request/send/interested/:userId", userAuth ,async(req,res)=> {


 

});

module.exports = requestRouter;
