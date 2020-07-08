const express = require('express');

const router = express.Router();

//import user database and import post database
const Users = require('./userDb');
const Posts = require('../posts/postDb');

router.post('/', validateUser, (req, res) => {
  Users.insert({name: req.body.nam})
  .then(result => {
    res.status(201).json(result)
  })
  .catch( error => {
    console.log(error)
    res.status(500).json({ message: "User could not be created"})
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const newPost = req.body;
  Posts.insert({ ...newPost, user_id: req.user.id })
  .then(post => {
    res.status(201).json(post)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "Post could not be added" })
  })
});

router.get('/', (req, res) => {
  Users.get()
  .then(users => {
    res.status(201).json(users)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: " There was an error getting the users." })
  })
});

router.get('/:id', validateUserId, (req, res) => {
  Users.getById(req.params.id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "User ID could not be found" })
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
  .then(users => {
    res.status(201).json(users)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "Could not find user post" })
  })
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
