 const http = require('http');
 const fs = require('fs');

 const server = http.createServer((req, res)=>{
    const url = req.url;
    const method = req.method;

    if(url==='/'){
      res.write('<html> <head><title>Enter Message</title><head>');
      res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">submit</button></form></body></html>');
      return res.end();
    }
    if(url ==='/message' && method ==='POST'){
      const body=[];
      req.on('data',(data)=>{
         body.push(data);
      });
      return req.on('end', ()=>{
         const parsedBody = Buffer.concat(body).toString();
         const message = parsedBody.split('=')[1];
         fs.writeFile('message.txt', message,(err)=>{
            res.statusCode=302;
            res.setHeader('Location', '/');
            return res.end();
         });
      });
   }
   res.setHeader('Content-Type', 'text/html');
   const message = req.message;
   res.write('<html> <head><title>your Message</title></head>');
   res.write('<body><h1>'+message+'</h1></body></html>');
   res.end();
 });

 server.listen(2000);