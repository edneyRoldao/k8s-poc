require('dotenv').config();
const axios = require('axios');
const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

const BACKEND_HOST = `http://${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}`;

console.log('##################################');
console.log('##################################');
console.log("$$$$$", BACKEND_HOST);
console.log('##################################');
console.log('##################################');

app.get('/home', (req, res) => {
    res.render('home');
})

app.get('/', async (req, res) => {
    const response = await axios.get(`${BACKEND_HOST}/api/addresses`);
    res.render('index', { addresses: response.data });
})

app.post('/save', async (req, res) => {
    const addressPartial = {
        clientName: req.body.name,
        cep: req.body.cep,
        number: req.body.number,
    };

    const response = await axios.post(`${BACKEND_HOST}/api/addresses`, addressPartial);

    res.render('detail-address', { address: response.data });
})

app.get('/new-address', (req, res) => {
    res.render('new-address');
})

app.get('/detail-address/:id', async (req, res) => {
    const response = await axios.get(`${BACKEND_HOST}/api/addresses/${req.params.id}`);
    res.render('detail-address', { address: response.data });
})

app.listen(parseInt(process.env.APP_PORT), () => {
    console.log(`frontend is working on port: ${process.env.APP_PORT}`);
})
