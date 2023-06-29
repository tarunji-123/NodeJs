const fs = require('fs');

const requestHandler= (req, res)=>{
    
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>My Page</title></head>');
        const messages = fs.readFileSync('message.txt', 'utf-8').split('\n');
        const messages1 = messages.map((message) => message.replace("+", " "));
    
        for (const message of messages1) {
          res.write('<li>');
          res.write(message);
          res.write('</li>');
        }
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form>');
        
        
        res.write('</body>');
        res.write('</html>');
        return res.end();
      }
    
    if(url === '/message' && method==='POST'){
        const body =[];
        req.on('data',(chunk)=>{
            console.log(chunk);
            body.push(chunk);
        })
        req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt',message);
        })
        res.statusCode = 302;;
        res.setHeader('location','/');
        return res.end();
    }
}

// module.exports = requestHandler;

// module.exports = {
//     handler : requestHandler,
//     someText : 'Some hard coded text'
// }

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some hard coded text';

//shortcut
exports.handler = requestHandler;
exports.someText = 'Some hard coded text';
