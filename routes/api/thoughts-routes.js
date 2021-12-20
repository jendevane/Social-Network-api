    const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThoughts,
    deleteThoughts,
    addReaction,
    removeReaction,

  } = require('../../controllers/thoughts-controllers');

router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThoughts)
  .delete(deleteThoughts);
  
router
  .route('/')
  .post(createThought)
  .get(getAllThoughts);
router
  .route('/:thoughtId/reactions/')
  .post(addReaction);
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);




module.exports = router;