const express = require('express');
const router = express.Router();
const UserDB = require('../model/UserDB');
const DataBase = require ('../model/DataBase')

router.get('/', async (req, res) => {

    console.log('GET /score');
    let usersDB = new UserDB(new DataBase())

    let users = await usersDB.getScore();
    console.log(users)

    res.status(200).send(users);
});

module.exports = router;