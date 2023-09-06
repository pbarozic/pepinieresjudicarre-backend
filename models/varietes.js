const mongoose = require('mongoose');

const varietesSchema = mongoose.Schema({
    famille: String,
    Variete: String,
    sousVariete: String,
    description: String,
    conditionnement: String,
});

const Variete = mongoose.model('variétés', varietesSchema);

module.exports = Variete;