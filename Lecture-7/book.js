const express = require("express")
const app = express()

const bookStore = [
    {id: 1, name: "Stranger Things", author: "Duffer Brothers"},
    {id: 2, name: "Wednesday", author: "Adams"},
    {id: 3, name: "Harry Potter", author: "Magical"},
]

app.use(express.json())

app.get("/book", (req, res) => {
    res.send(bookStore)
})

app.get("/book/:id", (req,res) => {
    const id = parseInt(req.params.id);

    const Book = bookStore.find(info => info.id === id)
    
    res.send(Book)
})

app.post("/book", (req, res) =>{
    bookStore.push(req.body)

    // console.log("Data saved successfully");

    res.send("Data saved successfully")
    
})

app.listen(3000, () => {
    console.log("Server is listening at port 3000");
})