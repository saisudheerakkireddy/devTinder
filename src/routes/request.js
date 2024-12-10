const express = require("express");
const requestRouter = express.Router();
const userAuth= require("../middlewares/auth.js");
const ConnectionRequest = require("../models/ConnectionRequest.js");
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
    const data = await connectionRequest.save();

    return res.status(200).json({message: "Connection request is sent ",data})

 }catch(err){
    res.status(400).send("ERROR" +err.message ) 

 }

});

requestRouter.post("/request/review/:status/:requestId",userAuth, async(req,res) => {

    //e78 sender 589receiver
    // loggedIn user should be touserid
    // status allowed: accepted, rejected
    // 

    try {
        const {status, requestId} = req.params;  
        const loggedInUser = req.user;

        const allowedStatus = ["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "Status not allowed!"});
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id : requestId,
            toUserId : loggedInUser._id,
            status :  "interested",
         });
         if(!connectionRequest){
            return res.status(404).json({message: "Connection request not found"})
         }

         connectionRequest.status = status;

      const data =    await connectionRequest.save();

         res.json({message:"Connection request " + status, data});
   
    } catch (err) {

        res.status(400).send("Error:" + err.message);
        
    }
})

module.exports = requestRouter;
