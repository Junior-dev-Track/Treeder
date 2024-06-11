const express = require('express');
const router = express.Router();
const DataBase = require ('../model/DataBase')

router.get('/', async (req, res) => {

    const db = new DataBase()

    const data = await db.query('SELECT IdTrees, TotHight, Species FROM `Trees`')

    res.send(data);
});

module.exports = router;