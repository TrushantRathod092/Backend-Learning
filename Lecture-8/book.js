const express = require("express")
const app = express()

const bookStore = [
    {id: 1, name: "Stranger Things", author: "Duffer Brothers"},
    {id: 2, name: "Wednesday", author: "Adams"},
    {id: 3, name: "Harry Potter", author: "Magical"},
    {id: 4, name: "The Rings", author: "Magical"},
]

app.use(express.json())

app.get("/book", (req, res) => {
    console.log(req.query);

    let Book;

    if(req.query.author){
        Book = bookStore.filter(book => book.author === req.query.author)
    }

    // if(req.query.name){
    //     Book = bookStore.filter(book => book.name === req.query.name)
    // }
    
    res.send(Book)
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

app.patch("/book", (req, res) => {
    console.log(req.body);

    const Book = bookStore.find(book => book.id === req.body.id)
    
    if(req.body.author) Book.author = req.body.author

    if(req.body.name) Book.name = req.body.name
    
    res.send("Patch Updated")
})

app.put("/book", (req, res) => {
    const Book = bookStore.find(book => book.id === req.body.id)

    Book.author = req.body.author
    Book.name = req.body.name

    res.send("Changes Updated Successfully")
})

app.delete("/book/:id", (req, res) => {
    const id = parseInt(req.params.id)

    const index = bookStore.findIndex(book => book.id === id)

    bookStore.splice(index, 1)

    res.send("Deleted Successfully")
})

app.listen(3000, () => {
    console.log("Server is listening at port 3000");
})