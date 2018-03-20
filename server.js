'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const personRouter = require('./routes/person');
const carRouter = require('./routes/car');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1', personRouter);
app.use('/api/v1', carRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Tunning in to port ${PORT} ...`);
});
