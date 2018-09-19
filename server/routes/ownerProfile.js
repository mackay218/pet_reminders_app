const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('getting owner info', req.query.id);
    res.sendStatus(200);
});


module.exports = router;