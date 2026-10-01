const express = require("express")
const app = express()

app.use("/user", (req, res, next) => {
    console.log("First");
    // res.send("I am First")
    next();
    console.log("Sixth");
},
(req, res, next) => {
    console.log("Second");
    // res.send("I am Second")
    next();
    console.log("Fifth");
},
(req, res) => {
    console.log("Third");
    res.send("I am Third")
    console.log("Fourth");
}
)

app.listen(3000, () => {
    console.log("Server is running at port 3000");
})