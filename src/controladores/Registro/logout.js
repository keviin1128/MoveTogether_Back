const Usuario = require("../../modelos/usuarios");
const { addToBlacklist } = require("../../../config/blacklist");

const logoutController = async (req, res) => {
  const { email } = req.body;  // Mantén el email durante las pruebas
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ mensaje: 'No se proporcionó el token de autorización' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    // Buscar el usuario con el email (solo para las pruebas)
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Actualizar el estado de isLoggedIn
    usuario.isLoggedIn = false;
    await usuario.save();

    // Añadir el token a la lista negra
    await addToBlacklist(token);

    res.status(200).json({ mensaje: "Cierre de sesión exitoso" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor" });
  }
};

module.exports = logoutController;
