const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../middlewares/validacionesLogin');
const someProtectedController = require('../../controladores/Registro/someProtectedController');

router.get('/protected-route', authMiddleware, someProtectedController);

module.exports = router;