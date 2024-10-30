const express = require("express");
const router = express.Router();
const conversacionesController = require("../controladores/Mensajes/historialConversacion");

// Ruta para obtener las conversaciones de un usuario
router.get("/conversacion/:userId", conversacionesController.obtenerConversaciones);

module.exports = router;