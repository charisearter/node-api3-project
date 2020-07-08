const express = require('express');

const router = express.Router();

//import user database and import post database
const Users = require('./userDb');
const Posts = require('../posts/postDb');

router.post('/', validateUser, (req, res) => {
  // do your magic!
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
  .then(resource => {
    if(resource){
      req.user = resource;
      next();
    }else {
      res.status(400).json({ message: 'invalid user id' })
    }
  })
  .catch(err => {
    console.log(err)
  })
}

function validateUser(req, res, next) {
  const body = req.body;
  const name = req.body.name;

  !body ? res.status(400).json({ message: "missing user data" }):
  !name ? res.status(400).json({ message: "missing required name field" })
  : next();
}

function validatePost(req, res, next) {
  const body = req.body;
  const text = req.body.text;
  !body ? res.status(400).json({ message: "missing post data" }):
  !text ? res.status(400).json({ message: "missing required text field" })
  : next();

}

module.exports = router;
