const express = require("express")
const app = express()

const {Auth} = require("./Auth")

app.use(express.json())

const FoodMenu = [
    {id: 1, food: "Chowmin", category: "veg", price: 50}, 
    {id: 2, food: "Butter Naan", category: "veg", price: 60}, 
    {id: 3, food: "Chicken", category: "non-veg", price: 250}, 
    {id: 4, food: "Mutton", category: "non-veg", price: 700}, 
    {id: 5, food: "Momo", category: "veg", price: 70}, 
    {id: 6, food: "Chai", category: "veg", price: 20}, 
    {id: 7, food: "Sandwitch", category: "veg", price: 60}, 
    {id: 8, food: "Pizza", category: "veg", price: 400}, 
    {id: 9, food: "Burger", category: "veg", price: 200}, 
    {id: 10, food: "Egg", category: "non-veg", price: 150}, 
    {id: 11, food: "Panner", category: "veg", price: 200}, 
    {id: 12, food: "Pav-Bhaji", category: "veg", price: 110}, 
    {id: 13, food: "Biryani", category: "non-veg", price: 100}, 
    {id: 14, food: "Salad", category: "veg", price: 90}, 
    {id: 15, food: "Showarma", category: "veg", price: 170}, 
    {id: 16, food: "Rajma", category: "veg", price: 180}, 
]

const AddToCart = []

app.get("/food", (req, res) => {
    res.status(200).send(FoodMenu)
})

// Authenticate admin here
app.use("/admin", Auth)

app.post("/admin", (req, res, next) => {
    FoodMenu.push(req.body)
    res.status(201).send("Item Added Successfully")
})


app.delete("/admin/:id", (req, res) => {
    const id = parseInt(req.params.id)
        
    const index = FoodMenu.findIndex(item => item.id === id)
    
    if(index === -1){
        res.send("Item doesn't exist")
    }
    else{
        FoodMenu.splice(index, 1)
        res.send("Successfully Deleted")
    }
})


// try-catch
app.get("/dummy", (req, res) => {
    try {
        JSON.parse("Invalid Json") // it is a string not a valid json soit will throw an error

        throw new ERROR("BROKEN") // optional but important

        res.send("Hello jee")

    } catch (error) {
        res.send("Some error occured!! " + error)
    }
})

app.listen(3000, () => {
    console.log("Server is listening at port 3000");
})