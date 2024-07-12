const express = require('express');
const router = express.Router();
const UserDB = require('../model/UserDB');
const DataBase = require ('../model/DataBase')
const {authenticateToken} = require("../middleware/authenticateToken");

router.get('/', authenticateToken, async (req, res) => {

    let usersDB = new UserDB(new DataBase())
    let dataUser = req.query;


    let users = await usersDB.deleteUser(dataUser);

    res.status(200).send({message:"This user is banned"});
});

module.exports = router;