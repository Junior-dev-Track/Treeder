const express = require('express');
const router = express.Router();
const Database = require ('../model/Database')

router.get('/', async (req, res) => {

    const db = new Database()


    const data = await db.query('SELECT idUsers, nbTrees, Leafs FROM `Users`')


    res.send(data);
});

module.exports = router;