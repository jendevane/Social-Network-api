const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThoughts,
    deleteThoughts,
    addReaction,
    removeReaction,

  } = require('../controllers/thoughts-controllers');

// Set up GET all and POST at /api/Thoughts
router
  .route('/')
  .get(getAllThoughts)
  

// Set up GET one, PUT, and DELETE at /api/Thought/:id
router
  .route('/:id')
  .get(getThoughtById)
  .post(createThought)
  .put(updateThoughts)
  .delete(deleteThoughts);

  router
  .route('/:thoughtId/reactions')
  .post(addReaction)  

  router
  .route('/:id/reactions/:reactionId')
  .delete(removeReaction);


module.exports = router;