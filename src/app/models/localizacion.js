const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  longitud: Double,
  latitud: Double
});

module.exports = mongoose.model('User', userSchema);
