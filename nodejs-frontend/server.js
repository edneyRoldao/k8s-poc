const axios = require('axios');
const express = require('express');
const PORT = process.env.PORT | 3000;
const backendHost = 'http://localhost:3001';

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));


app.get('/', async (req, res) => {
    const response = await axios.get(`${backendHost}/api/addresses`);
    res.render('index', { addresses: response.data });
})

app.post('/save', async (req, res) => {
    const addressPartial = {
        clientName: req.body.name,
        cep: req.body.cep,
        number: req.body.number,
    };

    const response = await axios.post(`${backendHost}/api/addresses`, addressPartial);

    res.render('detail-address', { address: response.data });
})

app.get('/new-address', (req, res) => {
    res.render('new-address');
})

app.get('/detail-address/:id', async (req, res) => {
    const response = await axios.get(`${backendHost}/api/addresses/${req.params.id}`);
    res.render('detail-address', { address: response.data });
})

app.listen(PORT, () => {
    console.log(`frontend is working on port: ${PORT}`);
})
