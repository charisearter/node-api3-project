// code away!
const express = require('express');

//router for posts
//const routerName = require('./routerFolder/routerName');
//server end point base
//server.use('/api/posts', routerName);

const server = express();
server.use(express.json());

const PORT = 8000;
server.listen(PORT, () => {
  console.log('<h2> Server for Node Project 3</h2>');
});