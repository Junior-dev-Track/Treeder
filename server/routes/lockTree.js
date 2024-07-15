const express = require('express');
const router = express.Router();
const UserDB = require('../model/UserDB');
const TreeDB = require("../model/TreeDB");
const LogsDB = require("../model/LogsDB");
const DataBase = require ('../model/DataBase')
const {authenticateToken} = require("../middleware/authenticateToken");


router.post('/',authenticateToken , async (req, res) => {

    const { Tree, User } = req.body;

    // Splitting the data into two different variables
    let tree = Tree;
    let user = User;
    let logLock = null;
    if(user.Leafs > Number(tree.LockPrice)){


        let usersDB = new UserDB(new DataBase())
        let treeDb = new TreeDB(new DataBase())
        let logsDB = new LogsDB(new DataBase())


        // Update the user's leafs
        user.Leafs -= tree.LockPrice;
        await usersDB.updateUserLeavesBalance(user.IdUsers, user.Leafs);

        // Change the state of the tree
        tree.Lock = 1;
        await treeDb.updateLock(tree);

        // Add the logs
        logLock = {
            User: user.IdUsers,
            Categorie: "lock",
            Date: new Date().toISOString().replace('T', ' ').substring(0, 19),
            Log: `locked a tree for ${tree.LockPrice} leaves`
        }
        await logsDB.insertLog(logLock);
        res.status(200).send(logLock);

    }else {
        res.status(400).send({message : "Not enough leaves"});
    }

});

module.exports = router;