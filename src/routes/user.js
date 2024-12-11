const express = require("express");
const userRouter = express.Router();
const userAuth = require("../middlewares/auth.js");
const ConnectionRequest = require("../models/ConnectionRequest.js");

const SAFE_USER_DATA = "firstName lastName age gender";

// we have to get the pending rquests of loggedIn user
userRouter.get("/requests/received",userAuth,async(req,res) => {
try {
    const loggedInUser= req.user;

    const connectionRequests =  await ConnectionRequest.find({

        toUserId : loggedInUser._id,
        status : "interested",
    }).populate( "fromUserId" ,  ["firstName", "lastName"])

         res.status(200).json({message: "DATA ",data:connectionRequests})




    
} catch (err) {

    res.status(404).send("Error: " + err.message)
    
}


});

userRouter.get("/user/connections", userAuth, async(req,res) => {

    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or : [
                {toUserId:loggedInUser._id, status : "accepted"},
                {fromUserId : loggedInUser._id, status : "accepted"}
            ]
        }).populate("fromUserId",SAFE_USER_DATA).populate("toUserId",SAFE_USER_DATA);

       
        

        const data = connectionRequests.map((row) => {
        if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
            return row.toUserId;
        }
        return row.fromUserId;
        })




        res.status(200).json({data});

    }catch(err){
        res.status(400).send("ERROR:" + err.message)
    }


})








module.exports = userRouter;
