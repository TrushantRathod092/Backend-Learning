const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === "/"){
        res.end("Hello jee kaise ho Node.js")
    }
    else if(req.url === "/contact"){
        res.end("This is our contact page")
    }
    else if(req.url === "/about"){
        res.end("This is our about page")
    }
    else{
        res.end("Error: Page not found")
    }
})

server.listen(3000, () => {
    console.log("Server is running on port 3000")
})