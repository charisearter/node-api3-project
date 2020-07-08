// code away!
const express = require('express');

const server = express();
server.use(express.json());
//router setUp
//const routerName = require('./routerFolder/routerName');
//server end point base
//server.use('/api/posts', routerName);

//Posts Router
const postRouter = require('./posts/postRouter');
server.use('/api/posts', postRouter);
//Users Router
const userRouter = require('./users/userRouter'); 
server.use('/api/users', userRouter);


const PORT = 8000;
server.listen(PORT, () => {
  console.log('<h2> Server for Node Project 3</h2>');
});