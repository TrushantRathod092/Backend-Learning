const express = require("express");
require("dotenv").config();
const app = express();

const connectDB = require("./db");

const users = require("./routes/users");
const redisClient = require("./config/redis");

// body parser
app.use(express.json());

// Connect to databases
const initializeConnection = async () => {
    try {
        // await redisClient.connect();
        // console.log("Connected to Redis");

        // await connectDB();
        // console.log("MongoDB Connected");
        
        await Promise.all([redisClient.connect(), connectDB()]);
        console.log("Redis and MongoDB connected");

        app.listen(process.env.PORT, () => {
            console.log(`Server is running at port ${process.env.PORT}`);
        });

    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
};
// connectDB();

app.use('/api', users);

app.get('/', (req, res) => {
    console.log("I am inside the home page")
    res.send("Hello jee, welcome to home page")
})

initializeConnection();