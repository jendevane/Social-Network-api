const router = require('express').Router();
const thoughts = require('./thoughts-routes');
const users = require('./users-routes');


router.use('/thoughts', thoughts);
router.use('/users', users);

module.exports = router;