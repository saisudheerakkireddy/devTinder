const {cookie} = require("cookie-parser");
const {token, decode} = require("jsonwebtoken");
const { findById } = require("../models/user");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

const userAuth = async (req,res,next) => {

    try{
            //read a token

            const cookies = req.cookies;

            const {token} = cookies;
            if(!token){
                throw new Error(":  Token is not valid!!")
            }

            //validate the token

        const decodedObj = await jwt.verify(token,"DEV@Tinder$143");

      const {_id} = decodedObj;

       


            //find the user

      

            const user = await User.findById(_id);
            if(!user){
                throw new Error("User not found:");
            }
            req.user =user;
            next();




        }catch(err){
            res.status(400).send("ERROR" + err.message)
    
        }


       

    }
   







module.exports ={ userAuth}