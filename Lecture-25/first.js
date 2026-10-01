const bcrypt = require("bcrypt");

const password = "Rohit@123";

const Hashing = async() => {
    // console.time("hash");

    const salt = await bcrypt.genSalt(10);
    // hashcode + salt
    const hashPass = await bcrypt.hash(password, salt);

    const ans1 = await bcrypt.compare(password, hashPass); // true
    // const ans2 = await bcrypt.compare(hashPass, password); // false

    console.log(ans1);
    // console.log(ans2);
    console.log(salt);
    console.log(hashPass);
    // console.timeEnd("hash");
}

Hashing();

console.log("Completed");