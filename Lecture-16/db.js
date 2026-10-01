// const dns = require("dns");
// dns.setServers(["10.66.17.53"]);

const mongoose = require("mongoose");
const dotenv = require("dotenv");

// load env config
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

console.log(process.env.MONGODB_URI);

module.exports = connectDB;