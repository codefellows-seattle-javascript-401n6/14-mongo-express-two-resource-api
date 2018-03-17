'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const leadAPI = require('./routes/lead.js');
const contactAPI = require('./routes/contact.js');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/contacts', contactAPI);
app.use('/api/leads', leadAPI);

app.listen(PORT, () => {
  console.log(`Listening in at http://localhost:${PORT}.`);
});