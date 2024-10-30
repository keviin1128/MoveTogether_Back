const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definir el esquema del Post
const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId, // Referencia a la colección de usuarios
      ref: "Usuario",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now, // Fecha de creación
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
      },
    ],
    comments: [
      {
        usuario: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Usuario",
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true, // Esto agrega automáticamente los campos createdAt y updatedAt
  }
);

// Exportar el modelo
module.exports = mongoose.model("Post", PostSchema);
