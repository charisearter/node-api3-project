const express = require('express');

const server = express();
server.use(express.json());

//Posts Router
const postRouter = require('./posts/postRouter');
server.use('/api/posts', postRouter);

//Users Router
const userRouter = require('./users/userRouter'); 
server.use('/api/users', userRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} ${req.get('Origin')}`
  );
  next();
}

module.exports = server;
