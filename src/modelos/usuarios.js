const mongoose = require("mongoose");

// Definimos el esquema para el usuario
const UsuarioSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    username: {
      type: String,
      required: false,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9_]{6,20}$/,
        "El nombre de usuario debe tener entre 6 y 20 caracteres y solo puede contener letras, números y guiones bajos",
      ]
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Por favor ingresa un email válido"],
      index: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [8, "La contraseña debe tener al menos 8 caracteres"],
    },
    verificationCode: {
      type: String,
      required: false, // No es requerido al crear el usuario pero se agregará después
    },
    changePassCode: { 
      type: String,
      required: false, // No es requerido al crear el usuario pero se agregará después
    },
    verifiedStatus: {
      type: Boolean,
      default: false, // Al crear el usuario, no está verificado
    },
    status: {
      type: Boolean,
      default: false, // Usuario inactivo hasta que verifique su email
    },
    phoneNumber: {
      type: String,
      match: [/^\d{7,10}$/, "Por favor ingresa un número de teléfono válido"],
    },
    birthDate: {
      type: Date,
      required: [true, "La fecha de nacimiento es obligatoria"],
    },
    gender: {
      type: String,
      enum: ["Masculino", "Femenino"],
    },
    avatar: {
      type: String,
      default: "https://res.cloudinary.com/dkzosj1gi/image/upload/v1729719886/i16jiqseqgag9xypiabb.jpg",
    },
    sports: {
      type: [String],
      required: [true, "El deporte es obligatorio"],
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
      },
    ],
    ubi: {
      country: { type: String },
      city: { type: String },
    },
    isLoggedIn: {
      type: Boolean,
      default: false, // Por defecto, el usuario no está logueado
    }
  },
  {
    collection: "Usuarios",
    timestamps: true,
  }
);

// Middleware para asignar un valor predeterminado a username si no se proporciona
UsuarioSchema.pre('save', function(next) {
  if (!this.username) {
    this.username = `user_${Date.now()}`; // Asigna un valor predeterminado único
  }
  next();
});

// Creamos el modelo basado en el esquema
const Usuario = mongoose.model("Usuario", UsuarioSchema);

module.exports = Usuario;
