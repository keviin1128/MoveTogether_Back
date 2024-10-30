const Usuario = require("../../modelos/usuarios");

const subirFotoPerfil = async (req, res) => {
  console.log("Solicitud recibida en /fotoPerfil");
  try {
    const email = req.params.email; // El correo electrónico viene de los parámetros de la URL
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    
    const { avatar } = req.body; // La URL de la imagen viene en el cuerpo de la solicitud
    
    if (!avatar) {
      return res.status(400).json({ message: "No se ha proporcionado ninguna URL de imagen" });
    }
    
    // Guardamos la URL de la imagen en el campo "avatar" del usuario
    usuario.avatar = avatar;
    await usuario.save();
    
    res.status(200).json({ message: "Foto de perfil actualizada correctamente", avatar: usuario.avatar });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar la foto de perfil", error: error.message });
    }
};

module.exports = subirFotoPerfil;
