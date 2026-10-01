const express = require("express");
const app = express();
const connectDB = require("./db");
const users = require("./routes/users")

app.use(express.json());

connectDB();

app.use('/api', users);

app.get('/', (req, res) => {
    console.log("This is the home page");
    res.send("Welcome to the home page");
})

app.listen(3000, () => {
    console.log("Server is running at port 3000");
})