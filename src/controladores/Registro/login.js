const Usuario = require("../../modelos/usuarios");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email y contraseña son requeridos" });
  }

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Verificar la contraseña
    if (usuario.password !== password) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    if (!usuario.status) {
      return res.status(403).json({
        mensaje: "Cuenta no verificada. Por favor, verifica tu cuenta.",
      });
    }

    // Marcar como logged in
    usuario.isLoggedIn = true;
    await usuario.save();

    // Generar el token JWT
    const payload = {
      id: usuario._id,
      name: usuario.fullname,
      email: usuario.email,
      phoneNumber: usuario.phoneNumber,
      avatar: usuario.avatar,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    console.log("Inicio de sesión exitoso");
    console.log("Token generado:", token);
    
    return res.json({
      mensaje: "Inicio de sesión exitoso",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error del servidor", error });
  }
};

module.exports = loginController;
