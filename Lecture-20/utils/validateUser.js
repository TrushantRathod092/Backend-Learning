// Api level validation

const validator = require("validator")

const validateUser = (data) => {
    const mandatoryField = ["name", "age", "email", "password"]

    const isAllowed = mandatoryField.every((k) => Object.keys(data).includes(k));

    if(!isAllowed){
        throw new Error("Required Fields are Missing");
    }
    
    if(!validator.isEmail(data.email)){
        throw new Error("Invalid Email");
    }

    if(!validator.isStrongPassword(data.password)){
        throw new Error("Weak Password");
    }
    
    if(!(data.name.length >= 2 && data.name.length <= 20)){
        throw new Error("Length of name should be atleast 2 and atmost 20");
    }
}

module.exports = validateUser;