const express = require("express");
const router = express.Router();
const conversacionesController = require("../controladores/conversaciones");

// Ruta para obtener las conversaciones de un usuario
router.get("/api/conversations/:userId", conversacionesController.obtenerConversaciones);

module.exports = router;