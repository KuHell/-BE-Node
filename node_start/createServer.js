const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<h1>Hello node</h1>");
    res.end("<p>go Server 09 04</p>");
  })

  .listen(3000, () => {
    console.log("3000 port is running");
  });

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<h1>Hello node</h1>");
    res.end("<p>go Server 09 04</p>");
  })

  .listen(3001, () => {
    console.log("3001 port is running");
  });
