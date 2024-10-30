const express = require('express');
const router = express.Router();
const loginController = require('../../controladores/Registro/login');
const { loginValidator, handleValidationErrors } = require('../../middlewares/validacionesLogin');

router.post('/login', loginValidator, handleValidationErrors, loginController);

module.exports = router;