const express = require('express');

const router = express.Router();

//import port database
const Posts = require('./postDb');

router.get('/', (req, res) => {
  Posts.get()
  .then(posts => {
    res.status(201).json(posts)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: " There was an error getting the posts." })
  })
});

router.get('/:id', validatePostId, (req, res) => {
  Posts.getById(req.params.id)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "Post ID could not be found" })
  })
});

router.delete('/:id', validatePostId, (req, res) => {
  Posts.remove(req.params.id)
  .then(post => {
    res.status(204).json({ message: `${post} successfully deleted.` })
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "There was an error deleting the post" })
  })
});

router.put('/:id', validatePostId, (req, res) => {
  const changes = req.body;
  Posts.update(req.params.id, changes)
  .then(updated => {
    res.status(200).json(updated)
  })
  .catch( error => {
    console.log(error)
    res.status(500).json({ message: " There was an error updating the post" })
  })
});

// custom middleware

function validatePostId(req, res, next) {
  Posts.getById(req.params.id)
  .then(resource => {
    if(resource){
      req.post = resource;
      next();
    }else {
      res.status(400).json({ message: 'invalid post id' })
    }
  })
  .catch(err => {
    console.log(err)
  })
}

module.exports = router;
