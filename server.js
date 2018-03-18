'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use('/api', './routes/brand');
//app.use('api/', './routes/car');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Tunning in to port ${PORT} ...`);
});
