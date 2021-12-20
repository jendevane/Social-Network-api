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
  .route('/:id')
  .get(getThoughtById)
  
  .put(updateThoughts)
  .delete(deleteThoughts)
  
router
  .route('/')
  .post(createThought)
  .get(getAllThoughts)
  router
  .route('/:thoughtId/reactions')
  .post(addReaction)
  .delete(removeReaction);




module.exports = router;