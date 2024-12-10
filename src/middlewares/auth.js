const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

const userAuth = async (req,res,next) => {

    try{
            //read a token

            const token = req.cookies.token;

            // const {token} = cookies;
            if(!token){
                throw new Error(":  Token is not vali  d!!")
            }

            //validate the token

        const decodedObj = jwt.verify(token,"DEV@Tinder$143");

        const {_id} = decodedObj;

            //find the user
            const user = await User.findById(_id);
            if(!user){
                throw new Error("User not found:");
            }

            req.user =user;
            next();
            }catch(err){
            return res.status(400).send("ERROR" + err.message)
    
        }


       

    }
   







module.exports =userAuth;