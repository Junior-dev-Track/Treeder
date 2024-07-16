const express = require('express');
const router = express.Router();
const UserDB = require('../model/UserDB');
const DataBase = require ('../model/DataBase')
const {authenticateToken} = require("../middleware/authenticateToken");

router.post('/', authenticateToken, async (req, res) => {

    let usersDB = new UserDB(new DataBase())
    let userData =  req.body;

    const update = await usersDB.updateUserSkin(userData);


    res.status(200).send(update);
});


module.exports = router;