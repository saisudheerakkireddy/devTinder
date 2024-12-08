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
};

const validateProfileEditData = (req) => {
    const allowedEditFields = ["firstName","lastName","about", "skills","age","gender"];

    const isEditAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field));

return isEditAllowed;
}

module.exports = {validateSignUpData,validateProfileEditData};