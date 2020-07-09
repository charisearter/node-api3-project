
const express = require('express');

const server = express();
server.use(express.json());

//Posts Router
const postRouter = require('./posts/postRouter');
server.use('/api/posts', logger, postRouter);

//Users Router
const userRouter = require('./users/userRouter'); 
server.use('/api/users', logger, userRouter);


server.get('/', (req, res) => {
  const message = process.env.MESSAGE;
  res.status(200).json({message});
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} ${req.get('Origin')}`
  );
  next();
}

module.exports = server;
