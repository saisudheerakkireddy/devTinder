const express = require("express");
const requestRouter = express.Router();
const userAuth= require("../middlewares/auth.js");
const ConnectionRequest = require("../models/ConnectionRequest.js");
const { findOne } = require("../models/user.js");
const User = require("../models/user.js");




requestRouter.post("/request/send/:status/:userId", userAuth ,async(req,res)=> {
try{
    const fromUserId = req.user._id;
    const toUserId = req.params.userId;
    const status = req.params.status;

    const allowedStatus = ["interested", "ignored"];
    if(!allowedStatus.includes(status)){
throw new Error("  :Not Allowed")
    }

    //checking if toUserId is present in our DB

    const toUser = await User.findById(toUserId);
    if(!toUser){
        return res.status(404).send("Cannot send Connection request")
    }

    // check if there is already an existing connection request 

    const existingConnectionRequest = await ConnectionRequest.findOne({
        $or : [
            {fromUserId,toUserId},
            {fromUserId:toUserId,toUserId:fromUserId}
        ]
    })
    if(existingConnectionRequest){
        return res.status(400).send("Connection already exists")
    }


    const connectionRequest = new ConnectionRequest({
        fromUserId,toUserId,status

    })

    const existingConnection = async ()=> {

     

    }

    const data = await connectionRequest.save();

    return res.status(200).json({message: "Connection request is sent ",data})

 }catch(err){
    res.status(400).send("ERROR" +err.message ) 

 }

});

module.exports = requestRouter;
