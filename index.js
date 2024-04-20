const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/routes');
const app = express();
const port = 80;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use(cors());
app.use(bodyParser.json());

app.use('/', router);

app.listen(port, () => {
    console.log(`Server started on PORT ${port}`);
});

module.exports = app;