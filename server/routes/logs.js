const express = require('express');
const DataBase = require("../model/LogsDB");
const router = express.Router();

router.get('/', async (req, res) => {

    const db = new DataBase()

    const data = await 
    res.send(data);
});

module.exports = router;