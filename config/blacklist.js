const mongoose = require('mongoose');

// Definir el esquema y el modelo para la lista negra
const blacklistSchema = new mongoose.Schema({
  token: String,
});

const Blacklist = mongoose.model('Blacklist', blacklistSchema);

const addToBlacklist = async (token) => {
  const exists = await Blacklist.findOne({ token });
  if (!exists) {
    const newToken = new Blacklist({ token });
    await newToken.save();
  }
};

const isBlacklisted = async (token) => {
  const exists = await Blacklist.findOne({ token });
  return !!exists;
};

module.exports = {
  addToBlacklist,
  isBlacklisted,
};
