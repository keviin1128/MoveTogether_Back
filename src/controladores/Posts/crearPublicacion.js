const Usuario = require("../../modelos/usuarios");
const Post = require("../../modelos/post");
const mongoose = require("mongoose");

exports.createPost = async (req, res) => {
  try {
    // Log para confirmar el contenido de req.body
    console.log("Contenido de req.body:", req.body);

    const { title, content, author } = req.body;

    // Validar que se envíen title y author
    if (!title || !content || !author) {
      return res.status(400).json({
        message:
          "Se requiere un título, contenido y autor para la publicación.",
      });
    }

    // Validar si el author es un ObjectId válido
    if (!mongoose.isValidObjectId(author)) {
      return res.status(400).json({ message: "ID de autor no válido." });
    }

    // Verificar que el usuario existe
    const usuario = await Usuario.findById(author);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Crear un nuevo post con título y otros datos
    const newPost = new Post({
      title,
      content,
      author,
      image: req.files && req.files.length > 0 ? req.files[0].path : null,
      date: new Date(),
    });

    // Guardar el post en la base de datos
    await newPost.save();

    // Respuesta con el post creado
    return res
      .status(201)
      .json({ message: "Publicación creada con éxito.", post: newPost });
  } catch (error) {
    console.error("Error en createPost:", error);
    return res.status(500).json({ message: "Error al crear la publicación." });
  }
};
