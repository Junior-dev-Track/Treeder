const express = require('express');
const router = express.Router();
const UserDB = require('../model/UserDB');
const DataBase = require ('../model/DataBase')

router.get('/', async (req, res) => {

    let usersDB = new UserDB(new DataBase())

    let users = await usersDB.getAllUser();

    res.status(200).send(users);
});

module.exports = router;