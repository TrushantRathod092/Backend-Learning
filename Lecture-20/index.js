const express = require("express");
const app = express();

const connectDB = require("./db");

const users = require("./routes/users");

// body parser
app.use(express.json());

// connect to database
connectDB();

app.use('/api', users);

app.get('/', (req, res) => {
    console.log("I am inside the home page")
    res.send("Hello jee, welcome to home page")
})

app.listen(3000, () => {
    console.log("Server is running at port 3000");
})