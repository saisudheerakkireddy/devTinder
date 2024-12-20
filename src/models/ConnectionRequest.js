const mongoose = require("mongoose");
const User = require("../models/user.js");


const connectionRequestSchema = new mongoose.Schema( {

    fromUserId:{
    type : mongoose.Schema.Types.ObjectId,
    ref:"User",  //reference to the user collection
    index: true,
    required:true, 
              },
    toUserId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        index: true,
        required:true,
             },
    status:{
        type: String,
        required:true,
        enum: {
            values:   ["interested","ignored","accepted","rejected"],
            message: `{VALUE} IS INCORRECT STATUS TYPE`

        }
           
          }                           

},
{
    timestamps:true,
});

// Compound index fromUserId to toUserId
connectionRequestSchema.index({fromUserId : 1,toUserId : 1});



// To demonstrate pre hook
connectionRequestSchema.pre("save",function (next) {

    const connectionRequest =this;
    // check if the from user id is same as touserId

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send request to yourself");
    }
    next();

})

const ConnectionRequest = new mongoose.model("Connection Request", connectionRequestSchema);

module.exports = ConnectionRequest;