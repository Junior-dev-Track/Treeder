const express = require('express');
const router = express.Router();
const UserDB = require('../model/UserDB');
const DataBase = require ('../model/DataBase')
const {authenticateToken} = require("../middleware/authenticateToken");

router.post('/', authenticateToken, async (req, res) => {

    let dataUser = req.body

    let usersDB = new UserDB(new DataBase())

    console.log("test data user",dataUser);
    let users = await usersDB.getUserWithLog(dataUser);

    res.status(200).send(users);
});

module.exports = router;