const validator = require("validator");


const validateSignUpData = async (req)=> {
    const{firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not valid");
    }else if(!validator.isEmail(emailId)){
    throw new Error("Invalid credentials");
}
    // }else if(validator.isStrongPassword(password)){
    //     throw new Error ("Enter Strong password");
    // }
}

module.exports = {validateSignUpData};