const router = require('express').Router();

const {
    getAllUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
  } = require('../controllers/user-controllers');


router
  .route('/')
  .get(getAllUsers)
  .post(createUsers);


router
  .route('/:id')
  .get(getUsersById)
  .put(updateUsers)
  .delete(deleteUsers);

module.exports = router;