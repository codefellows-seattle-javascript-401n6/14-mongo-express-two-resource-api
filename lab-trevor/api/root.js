const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send(new Date());
});

router.post('/', (req,res) => {
    console.log('got body', req.body);
    res.send(req.body);
})

module.exports = router;
