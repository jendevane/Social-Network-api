const router = require('express').Router();
const thoughts = require('./api/thoughts-routes');
const users = require('./api/users-routes');


router.use('/thoughts', thoughts);
router.use('/users', users);

module.exports = router;