'use strict';

const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router
  .route('/cars')
  .get(carController.list)
  .post(carController.create)
  .delete(carController.removeAll);

router
  .route('/car/:_id')
  .get(carController.getCar)
  .put(carController.update)
  .delete(carController.remove);

module.exports = router;
