const express = require('express');
const DataBase = require("../model/DataBase");
const router = express.Router();

router.get('/', async (req, res) => {

    const db = new DataBase()

    const data = await db.query('SELECT idUsers, nbTrees, Leafs FROM `Users`')
    res.send(data);
});

module.exports = router;