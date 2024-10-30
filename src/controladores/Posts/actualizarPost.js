const Usuario = require("../../modelos/usuarios");
const Post = require("../../modelos/post");
const mongoose = require("mongoose");
const fs = require("fs"); // Para gestionar archivos en el servidor

const actualizarPublicacion = async (req, res) => {
  const { post_id } = req.params;
  const { title, content } = req.body;

  // Validar ID de la publicación
  if (!mongoose.isValidObjectId(post_id)) {
    return res.status(400).json({ message: "ID de publicación inválido." });
  }

  // Verificar que al menos un campo esté presente en el cuerpo de la solicitud
  if (!title && !content && (!req.files || req.files.length === 0)) {
    return res
      .status(400)
      .json({ message: "No se enviaron datos para actualizar." });
  }

  try {
    // Buscar el post existente
    const post = await Post.findById(post_id);
    if (!post) {
      return res.status(404).json({ message: "Publicación no encontrada." });
    }

    // Actualizar campos de texto si existen
    if (title) post.title = title;
    if (content) post.content = content;

    // Si se envía una nueva imagen, reemplazar la anterior
    if (req.files && req.files.length > 0) {
      // Borrar la imagen anterior si existe
      if (post.image) {
        fs.unlink(post.image, (err) => {
          if (err) console.error("Error al eliminar la imagen anterior:", err);
        });
      }

      // Asignar la nueva imagen
      post.image = req.files[0].path;
    }

    // Guardar cambios
    await post.save();

    return res.status(200).json({ message: "Publicación actualizada.", post });
  } catch (error) {
    console.error("Error al actualizar la publicación:", error);
    return res.status(500).json({ message: "Error del servidor." });
  }
};

module.exports = actualizarPublicacion;
