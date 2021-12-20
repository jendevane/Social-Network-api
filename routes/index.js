const router = require('express').Router();
const thoughts = require('./api/thoughts-routes');
const users = require('./api/users-routes');


router.use('/Thoughts', thoughts);
router.use('/User', users);

module.exports = router;