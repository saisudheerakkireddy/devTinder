const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middlewares/auth.js");
const { validateProfileEditData } = require("../utils/validation.js");
const bcrypt = require("bcrypt");








    profileRouter.get("/profile/view", userAuth, async (req,res)=> {

    try{ 
        const user = req.user;
    res.send(user);
    
    
    } catch(err){
        res.status(401).send("ERROR " + err.message);
    
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
            res.status(401).send("ERROR:" + err.message);

        }
    });

    profileRouter.patch("/profile/password",userAuth, async (req,res) => {

     try{
        const{ currentPassword, newPassword} = req.body;

        if(!currentPassword || !newPassword){

            return res.status(400).json({message:"current and new password are required"});
        }

        const loggedInUser = req.user;



        const isMatch = await bcrypt.compare(currentPassword,loggedInUser.password);

        if(!isMatch){
            return res.status(401).send("Password is incorrect");
        }

        const newPasswordHash = await bcrypt.hash(newPassword,10);

        loggedInUser.password = newPasswordHash;

        await loggedInUser.save();

        return res.status(200).send("Password Changed Successfully");
        }catch(err){

            res.status(500).send("Server Error");
        }



         });

    module.exports = profileRouter;
    