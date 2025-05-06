const http = require("http");

const server = http.createServer((req, res) => res.end("hello node"))

server.listen(2000)