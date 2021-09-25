const express = require('express');
const bodyParser = require("body-parser");


const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = 3000;

const allowedOrigins = ['http://localhost:3000',
                        'http://localhost:5500',
                        'http://192.168.8.13:5500',
                        'http://127.0.0.1:5500/',
                        'http://yourapp.com'];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes')(app);

app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));

