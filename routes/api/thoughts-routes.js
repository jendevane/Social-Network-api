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
  .post(createThought)
  .put(updateThoughts)
  .delete(deleteThoughts)
  .get(getAllThoughts)

  router
  .route('/:thoughtId/reactions')
  .post(addReaction)
  .delete(removeReaction);




module.exports = router;