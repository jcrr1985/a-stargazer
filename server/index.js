const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const countriesRoute = require('./routes/countriesRoute.js');

const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(express.json());

const port = 3001;

app.use(cors());

app.use('/', countriesRoute);

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
