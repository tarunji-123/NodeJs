// console.log("Hello World from Nodejs");

const http = require('http')


const server = http.createServer((req,res)=>{
    // console.log("Tarun Bhadoriya");
    // res.end("Hello, Tarun");
    const url = req.url;
    if(url === '/home'){
        res.write('<html>');
        res.write('<head><title>My first Page</title><head>');
        res.write('<body><h1>Welcome to Home Page</h1></body>');
        res.write('<html');
        res.end();
    }
    else if(url === '/about'){
        res.write('<html>');
        res.write('<head><title>My first Page</title><head>');
        res.write('<body><h1>Welcome to About us Page</h1></body>');
        res.write('<html');
        res.end();
    }
    else if(url === '/node'){
        res.write('<html>');
        res.write('<head><title>My first Page</title><head>');
        res.write('<body><h1>Welcome to Node js Project </h1></body>');
        res.write('<html');
        res.end();
    }
    else{
        res.end("go to any other url");
    }

})

const port = 4000;
server.listen(port, ()=>{
    console.log(`Server running on ${port}`);
})