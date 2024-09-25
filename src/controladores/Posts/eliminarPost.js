const mongoose = require("mongoose");
const Post = require("../../modelos/post");
const Usuario = require("../../modelos/usuarios");

const eliminarPublicacion = async (req, res) => {
  const { post_id } = req.params;

  // Verifica que el post_id sea válido
  if (!mongoose.isValidObjectId(post_id)) {
    return res.status(400).json({ message: "ID de publicación inválido." });
  }

  try {
    // Intenta encontrar la publicación
    const publicacion = await Post.findById(post_id);
    if (!publicacion) {
      console.log(
        `Publicación con ID ${post_id} no encontrada en la base de datos.`
      );
      return res.status(404).json({ message: "Publicación no encontrada." });
    }

    // Si se encuentra, la eliminamos
    const publicacionEliminada = await Post.findByIdAndDelete(post_id);
    if (!publicacionEliminada) {
      console.log(`Error al eliminar la publicación con ID ${post_id}.`);
      return res
        .status(404)
        .json({ message: "Error al eliminar la publicación." });
    }

    // Elimina la referencia de la publicación en el modelo de Usuario
    const result = await Usuario.updateMany(
      { publicaciones: post_id }, // Filtra los usuarios que tienen la publicación
      { $pull: { publicaciones: post_id } } // Elimina la publicación del array
    );

    if (result.nModified === 0) {
      console.log(
        `No se encontró la referencia de la publicación en ningún usuario.`
      );
      return res
        .status(404)
        .json({
          message:
            "Referencia de la publicación no encontrada en ningún usuario.",
        });
    }

    console.log(`Publicación y referencia eliminadas con éxito.`);
    return res
      .status(200)
      .json({ message: "Publicación y referencia eliminadas con éxito." });
  } catch (error) {
    console.error("Error al eliminar la publicación:", error);
    return res.status(500).json({ message: "Error del servidor." });
  }
};

module.exports = eliminarPublicacion;
