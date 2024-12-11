const express = require("express");
const userRouter = express.Router();
const userAuth = require("../middlewares/auth.js");
const ConnectionRequest = require("../models/ConnectionRequest.js");
const User = require("../models/user.js");
const { toInt } = require("validator");

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


});

userRouter.get("/feed",userAuth, async (req,res) => {
try{
   //sudheer should not see himself in the feed
   //he should not be seeing someone he already interacted with either interested or ignored 

   const loggedInUser = req.user;
   
   const page = parseInt(req.query.page) || 1 ;
     let limit = parseInt(req.query.limit) || 10;
     limit = limit>50 ? 50 : limit; // if limit if greater than 50 set it to 50 or limit
   const skip = (page-1) * limit;


   const connections = await ConnectionRequest.find({
 $or : [

    {fromUserId:loggedInUser._id},
    {toUserId: loggedInUser._id}
 ]
 }).select("fromUserId toUserId")


     const hideUsersFromFeed = new Set();
     connections.forEach((req) => {
        hideUsersFromFeed.add(req.fromUserId.toString());
        hideUsersFromFeed.add(req.toUserId.toString());
     });

     const users = await User.find({
        $and:[
            { _id : {$nin : Array.from(hideUsersFromFeed)}},
            { _id : { $ne : loggedInUser._id}}
        ]
     }).select(SAFE_USER_DATA)
     .skip(skip)
     .limit(limit);

   

   res.status(200).json({users});




}catch(err){
res.status(400).send("ERROR:" + err.message)
}

})








module.exports = userRouter;