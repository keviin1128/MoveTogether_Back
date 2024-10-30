const express = require('express');
const router = express.Router();
const logoutController = require('../../controladores/Registro/logout');

router.post('/logout', logoutController);

module.exports = router;