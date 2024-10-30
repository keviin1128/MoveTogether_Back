const Usuario = require("../../modelos/usuarios");

// Obtener lista de amigos por correo electrónico
const listarAmigosPorEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res
        .status(400)
        .json({ message: "El correo electrónico es obligatorio" });
    }

    // Buscar el usuario por correo electrónico e incluir detalles de amigos
    const usuario = await Usuario.findOne({ email })
      .populate("friends", "fullname email avatar isLoggedIn") // Incluir detalles de amigos
      .exec();

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({
      amigos: usuario.friends, // Devolver la lista de amigos con detalles
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener la lista de amigos", error });
  }
};

module.exports = {
  listarAmigosPorEmail,
};
