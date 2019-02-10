const mongoose = require('mongoose');

const mapSchema = new mongoose.Schema({
  name:String,
  longitud: Number,
  latitud: Number
});

module.exports = mongoose.model('map', mapSchema);
