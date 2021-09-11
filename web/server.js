const PORT = 8080;
const HOST = '0.0.0.0';
const express = require('express');
const metrics = require('./metrics.js');
const app = express();

metrics(app)

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);