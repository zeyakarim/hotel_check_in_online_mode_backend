const express = require('express');
const router = express.Router();
const controller = require('./controllers');

router.post('/signup', controller.createUser);

router.post('/signin', controller.signInUser);

router.get('/', controller.fetchUsers);

module.exports = router