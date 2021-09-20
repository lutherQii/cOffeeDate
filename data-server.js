const express = require('express');

const cors = require('cors');

const app = express();

app.use(cors());

const port = 3000;

const allowedOrigins = ['http://localhost:3000',
                        'http://localhost:5500',
                        'http://127.0.0.1:5500/',
                      'http://yourapp.com'];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes')(app);

app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));

