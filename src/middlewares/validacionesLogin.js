const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Usuario = require('../modelos/usuarios');
const { addToBlacklist, isBlacklisted } = require('../../config/blacklist');

// Validaciones de inicio de sesión
const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Por favor ingresa un email válido"),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
];

// Middleware para manejar errores de validación
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Middleware de autenticación
const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ mensaje: 'No se proporcionó el token de autorización' });
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    // Utiliza la clave secreta desde las variables de entorno
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Asegúrate de que JWT_SECRET esté definido en tu entorno
    const usuario = await Usuario.findById(decoded.id);

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Usuario no autorizado' });
    }

    // Verificar si el token está en la lista negra
    const blacklisted = await isBlacklisted(token);
    if (blacklisted) {
      return res.status(401).json({ mensaje: 'Token inválido' });
    }

    req.usuario = usuario; // Adjunta el usuario a la solicitud para usar en las rutas protegidas
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido' });
  }
};

module.exports = {
  loginValidator,
  handleValidationErrors,
  authMiddleware
};
