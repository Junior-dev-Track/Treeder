const express = require('express');
const router = express.Router();
const UserDB = require('../model/UserDB');
const DataBase = require ('../model/DataBase')
const {authenticateToken} = require("../middleware/authenticateToken");

router.get('/', authenticateToken, async (req, res) => {

    let usersDB = new UserDB(new DataBase())


    //TODO : suppress all the tree of the user, the user and the logs
    let users = await usersDB.deleteUser(dataUser);

    res.status(200).send(users);
});

module.exports = router;