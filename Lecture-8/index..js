const express = require("express")
const app = express();

app.use(express.json())

app.get("/user", (req, res) => {
    res.send({
        name: "Trushant",
        age: 20,
    })
})

app.post("/user", (req, res) => {
    console.log(req.body);

    res.send("Data send successfully")
})

app.listen(3000, () => {
    console.log("Server is listening at post 3000");
})