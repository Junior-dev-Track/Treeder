const express = require('express');
const router = express.Router();
const UserDB = require('../model/UserDB');
const DataBase = require ('../model/DataBase')

router.post('/', async (req, res) => {

    let dataUser = req.body

    let usersDB = new UserDB(new DataBase())

    let users = await usersDB.getUserWithLog(dataUser);

    res.status(200).send(users);
});

module.exports = router;