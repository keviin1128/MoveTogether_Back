const express = require("express");
const router = express.Router();
const actualizarPublicacion = require("../../controladores/Posts/actualizarPost");
const upload = require("../../../config/multer");

// Ruta para actualizar una publicación
router.put("/actualizar/post/:post_id", upload.any(), actualizarPublicacion);

module.exports = router;
