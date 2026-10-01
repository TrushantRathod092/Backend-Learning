const express = require("express")

const app = express()

app.get("/", (req, res) => {
    res.send({
        name: "Trushant",
        age: 20,
        money: 100,
        collage: "JSPM's RSCOE",
    });
})

app.get("/about", (req, res) => {
    res.send("This is our about page")
})

app.get("/contact", (req, res) => {
    res.send("This is our contact page")
})

app.listen(3000, () => {
    console.log("Listening at port 3000");
})