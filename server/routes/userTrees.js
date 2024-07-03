const express = require('express');
const router = express.Router();
const TreeDB = require('../model/TreeDB');
const DataBase = require ('../model/DataBase')
const {authenticateToken} = require("../middleware/authenticateToken");

router.get('/',authenticateToken, async (req, res) => {

    let treeDb = new TreeDB(new DataBase())
    let userData = req.user;

    let nbTrees = await treeDb.getNbtreesForUser(userData);

    res.status(200).send(nbTrees);
});

module.exports = router;