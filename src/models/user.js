const mongoose = require("mongoose");
const validator = require("validator"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    password: {
        type:String,
        required:true,
        trim : true

    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 4,
        maxLength: 40
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minLength: 2, // Added minLength
        maxLength: 40 // Added maxLength
    },
    emailId: {
        type: String,
        required: true,
        unique:true,
        trim: true,
        // we can also use enum here
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email format");
            }
        }
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 80
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender is incorrect");
            }
        }
    },
    skills: {
        type: [String],
       
    },
    about: {
        type: String
    },
    photoUrl: {
        type: String,
        validate(value){
            if(!isURL(value)){
                throw new Error("Invalid URL:" )
            }
        }
    }
}, {
    timestamps: true
});

userSchema.methods.getJWT = async function() {
        
    const user = this;
    
    const token = jwt.sign({_id : user._id}, "DEV@Tinder$143",{expiresIn:"7d"}
   
    );

    return token;

};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user= this;
    const passwordHash = user.password;


   
    const isPasswordValid= await  bcrypt.compare(
        passwordInputByUser
        ,passwordHash);

return isPasswordValid;

}



const User = mongoose.model("User", userSchema);

module.exports = User;