const express = require('express');
const router = express.Router();
const UserDB = require('../model/UserDB');
const DataBase = require ('../model/DataBase')
const {authenticateToken} = require("../middleware/authenticateToken");

router.post('/', authenticateToken, async (req, res) => {

    let dataUser = req.body

    let usersDB = new UserDB(new DataBase())

    let users = await usersDB.updateUser(dataUser);

    if (!dataUser.Pseudo || !dataUser.Password || !dataUser.Mail) {
        return res.status(400).send('Invalid data');
    }



    res.status(200).send(users);
});

module.exports = router;