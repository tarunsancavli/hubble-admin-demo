const express = require('express');

const cors = require('cors');

const { createUser, getUserList } = require('../controller/controller');

const router = express.Router();

router.post('/user/create',cors() , createUser);

router.get('/users/list', cors() ,getUserList);

module.exports = router;