const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write("<h1>Hello node</h1>");
  res.end("<p>go Server 09 04</p>");
});

server.listen(3000);

server.on("listening", () => {
  console.log("3000 port is running");
});

server.on("error", (error) => {
  console.log("error:", error);
});
