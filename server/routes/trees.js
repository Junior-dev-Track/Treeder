const express = require('express');
const router = express.Router();
const DataBase = require ('../model/DataBase')
const TreeDB = require("../model/TreeDB");

router.get('/', async (req, res) => {

    const db = new DataBase()
    const treeDb = new TreeDB(db);

    const data = await treeDb.getTrees();

    res.send(data);
})

module.exports = router;