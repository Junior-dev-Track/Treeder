const express = require('express');
const LogsDB = require('../model/LogsDB');
const DataBase = require ('../model/DataBase')
const router = express.Router();
const { authenticateToken } = require('../middleware/authenticateToken');

router.get('/',authenticateToken , async (req, res) => {


    let logsDB = new LogsDB(new DataBase())


    let logs = await logsDB.getLogAdmin();
    res.send(logs);


});

module.exports = router;