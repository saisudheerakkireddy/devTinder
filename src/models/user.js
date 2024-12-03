const mongoose = require("mongoose");
const { trim } = require("validator");

const userSchema =  new mongoose.Schema({

    firstName : {
        type: String,
        required: true,
        trim: true,
        minLength: 4,
        maxLength:40


        
    },
    lastName : {
        type: String,
        required: true,
        trim: true,
        
    },
    emailId:{
        type: String,
        required: true,
        trim: true,

        
    },
    age:{
        type: Number,
       required:true,
       min:18,
       max:80,
       
        validate(value){
            if(value<18){
                throw new Error("User must be ABOVE 18")
            }
        }
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value))
            {
                throw new Error("Gender is incorrect")
            }
        }
      

    },
    skills:{
        type: [String] ,
        
    }, 

    about:{
        type: String
    },
    photoUrl:{
        type: String
    }
  




},

{
    timestamps: true
});
    

      

const UserModel = mongoose.model("User",userSchema);

module.exports = UserModel;

