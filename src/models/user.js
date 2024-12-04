const mongoose = require("mongoose");
const validator = require("validator"); 
const { default: isURL } = require("validator/lib/isURL");

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

const User = mongoose.model("User", userSchema);

module.exports = User;