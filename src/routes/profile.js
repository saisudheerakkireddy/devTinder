const express = require("express");

const profileRouter = express.Router();


const userAuth = require("../middlewares/auth.js");
const { validateProfileEditData } = require("../utils/validation.js");









    profileRouter.get("/profile/view", userAuth, async (req,res)=> {

    try{ 
        const user = req.user;
    res.send(user);
    
    
    } catch(err){
        res.status(400).send("ERROR "+ err.message);
    
    }
    
    });

    profileRouter.patch("/profile/edit",userAuth, async (req,res) => {

        try{
            if(!validateProfileEditData(req)){
                throw new Error("Invalid Edit Req")
            }

            const loggedInUser = req.user;
      


         Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));   


         await loggedInUser.save();
            

            
         res.send(`${loggedInUser.firstName} your profile was updated successfully`);
        
        }catch(err){
            res.status(400).send("ERROR:" + err.message);

        }
    });
    profileRouter.patch("/profile/password",userAuth, async (req,res) => {
        
    })

    module.exports = profileRouter;
    