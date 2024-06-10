const express = require('express');
const router = express.Router();
const Database = require ('../model/Database')

router.get('/', async (req, res) => {

    const db = new Database()

    const data = await db.query('SELECT IdTrees, TotHight, Species FROM `Trees`')

    res.send(data);
});

module.exports = router;