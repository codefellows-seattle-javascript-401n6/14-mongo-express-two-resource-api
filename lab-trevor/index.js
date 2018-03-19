'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const storage = require('./module/storage');
const db = require('./module/db-storage');
const routes = require('./api/routes');
const root = require('./api/root');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

storage.seed();

app.use('/API/teams', routes);
app.use('/', root);


app.listen(PORT, () => {
    console.log('listening on port:' + PORT);
});