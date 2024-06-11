const express = require('express');
const Database = require("../model/DataBase");
const router = express.Router();

router.get('/', async (req, res) => {

    const db = new Database()

    const data = await db.query('SELECT idUsers, nbTrees, Leafs FROM `Users`')
    res.send(data);
});

module.exports = router;