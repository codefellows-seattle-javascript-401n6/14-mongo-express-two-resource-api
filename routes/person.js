'use strict';

const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');

router
  .route('/owners')
  .get(personController.list)
  .post(personController.create);

router
  .route('/owner/:_id')
  .get(personController.getPerson)
  .put(personController.update)
  .delete(personController.remove);

module.exports = router;
