const jwt = require('jsonwebtoken');
const { isBlacklisted } = require('../../config/blacklist');
const Usuario = require('../../modelos/usuarios');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ mensaje: 'No se proporcionó el token de autorización' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findById(decoded.id);

    if (!usuario || !usuario.isLoggedIn) {
      return res.status(401).json({ mensaje: 'Usuario no autorizado o no está activo' });
    }

    // Verificar si el token está en la lista negra
    const blacklisted = await isBlacklisted(token);
    if (blacklisted) {
      return res.status(401).json({ mensaje: 'Token inválido' });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'Token inválido' });
  }
};

module.exports = authMiddleware;
