const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThoughts,
    deleteThoughts,
    addReactions,
    removeReactions,

  } = require('../controllers/thoughts-controllers');

// Set up GET all and POST at /api/Thoughts
router
  .route('/')
  .get(getAllThoughts)
  

// Set up GET one, PUT, and DELETE at /api/Thought/:id
router
  .route('/:id')
  .get(getThoughtById)
  .post(addThought)
  .put(updateThoughts)
  .delete(deleteThoughts);

  router
  .route('/:thoughtId/reactions')
  .post(addReactions)  

  router
  .route('/:id/reactions/:reactionId')
  .delete(removeReactions);


module.exports = router;