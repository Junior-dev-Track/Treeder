const express = require('express');
const LogsDB = require('../model/LogsDB');
const DataBase = require ('../model/DataBase')
const router = express.Router();

router.get('/', async (req, res) => {

    let dataLogs = req.body;
    let LogsDB = new LogsDB(new DataBase())

    let logs = await LogsDB.getLog(dataLogs);

    res.send(logs);
});

module.exports = router;