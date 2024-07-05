const express = require('express');
const UserDB = require('../model/UserDB');
const DataBase = require ('../model/DataBase')
const router = express.Router();
const { authenticateToken } = require('../middleware/authenticateToken');

router.post('/',authenticateToken , async (req, res) => {

    let userDB = new UserDB(new DataBase())
    const userData = req.user;

    let user = await userDB.getUser(userData);

    res.status(200).send(user);
});

module.exports = router;