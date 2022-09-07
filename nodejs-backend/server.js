const axios = require('axios');
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT | 3001;
const Address = require('./model/address');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/address-database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", '*');
    next();
})


app.get('/api/addresses', async (req, res) => {
    const addresses = await Address.find();
    res.status(200).json(addresses);
});

app.get('/api/addresses/:id', async (req, res) => {
    const address = await Address.findById(req.params.id);
    
    if (!address)
        return res.status(404).json({message: 'address not found'});

    res.status(200).json(address);
});

app.post('/api/addresses', async (req, res) => {
    const address = new Address();
    address.cep = req.body.cep;
    address.number = req.body.number;
    address.clientName = req.body.clientName;

    const response = await axios.get(`https://viacep.com.br/ws/${req.body.cep}/json/`);

    address.uf = response.data.uf;
    address.bairro = response.data.bairro;
    address.localidade = response.data.localidade;
    address.logradouro = response.data.logradouro;

    const addressSaved = await address.save();

    res.status(201).json(addressSaved);
});


app.listen(PORT, () => {
    console.log(`frontend is working on port: ${PORT}`);
})
