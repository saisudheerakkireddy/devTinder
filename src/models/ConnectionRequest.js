const mongoose = require("mongoose");
const User = require("../models/user.js");


const connectionRequestSchema = {

    fromUserId:{
    type : mongoose.Schema.Types.ObjectId
              },
    toUserId:{
        type : mongoose.Schema.Types.ObjectId
             },
    status:{
        type: String,
        enum: 
             ["interested","ignored","accepted","rejected"]
          }                           

}

const ConnectionRequest = new mongoose.model("Connection Request", connectionRequestSchema);

module.exports = ConnectionRequest;