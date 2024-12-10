const mongoose = require("mongoose");
const User = require("../models/user.js");


const connectionRequestSchema = new mongoose.Schema( {

    fromUserId:{
    type : mongoose.Schema.Types.ObjectId,
    index: true,
    required:true, 
              },
    toUserId:{
        type : mongoose.Schema.Types.ObjectId,
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
})

const ConnectionRequest = new mongoose.model("Connection Request", connectionRequestSchema);

module.exports = ConnectionRequest;