const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error de conexión a MongoDB:", error);
    process.exit(1); // Terminar el proceso si no se puede conectar
  }
};

module.exports = connectDB;
