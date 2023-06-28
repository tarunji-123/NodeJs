// console.log("Hello World from Nodejs");

const http = require('http')

const server = http.createServer((req,res)=>{
    console.log("Tarun Bhadoriya");
    res.end("Hello, Tarun");
})

const port = 4000;
server.listen(port, ()=>{
    console.log(`Server running on ${port}`);
})