
const mongoose = require("mongoose");


const connectDB = async() => {

    await mongoose.connect(
        "mongodb+srv://sudheerakkireddy:sudheerakkireddy@test12.mqdau.mongodb.net/devTinder");

};

module.exports = connectDB;



