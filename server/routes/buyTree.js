const express = require('express');
const router = express.Router();
const UserDB = require('../model/UserDB');
const DataBase = require ('../model/DataBase')
const {authenticateToken} = require("../middleware/authenticateToken");

router.post('/', authenticateToken, async (req, res) => {

    let dataUser = req.body



});

module.exports = router;