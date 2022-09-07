const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true
    },
    cep: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    logradouro: {
        type: String,
        required: true
    },
    bairro: {
        type: String,
        required: true
    },
    localidade: {
        type: String,
        required: true
    },
    uf: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Address', addressSchema);
