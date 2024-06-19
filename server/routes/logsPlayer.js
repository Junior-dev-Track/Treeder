const express = require('express');
const LogsDB = require('../model/LogsDB');
const DataBase = require ('../model/DataBase')
const router = express.Router();

router.get('/', async (req, res) => {

    let logsDB = new LogsDB(new DataBase())

    let logs = await logsDB.getLogPlayer();
    res.send(logs);


});

module.exports = router;