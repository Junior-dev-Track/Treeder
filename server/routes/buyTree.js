const express = require('express');
const router = express.Router();
const UserDB = require('../model/UserDB');
const TreeDB = require("../model/TreeDB");
const LogsDB = require("../model/LogsDB");
const DataBase = require ('../model/DataBase')
const {authenticateToken} = require("../middleware/authenticateToken");

const nameGenerator = require ("fantasy-name-generator")


router.post('/',authenticateToken , async (req, res) => {

    const { Tree, User } = req.body;

    // Splitting the data into two different variables
    let tree = Tree;
    let user = User;
    let logBuy = null;

    if(user.Leafs > tree.Price){


        let usersDB = new UserDB(new DataBase())
        let treeDb = new TreeDB(new DataBase())
        let logsDB = new LogsDB(new DataBase())


        // Add a log
        logBuy = {
            User: user.IdUsers,
            Categorie: "buy",
            Date: new Date().toISOString().replace('T', ' ').substring(0, 19),
            Log: `bought a tree for ${tree.Price} leaves`
        }

        if(tree.Owner !== null){
            let logPurchase = {
                User: tree.Owner,
                Categorie: "wasPurchasedBy",
                Date: new Date().toISOString().replace('T', ' ').substring(0, 19),
                Log: `A tree was purchased by ${user.Pseudo} for ${tree.Price} leaves`
            }
            await logsDB.insertLog(logPurchase);
        }else if(tree.Name === null) {
            tree.Name = nameGenerator.nameByRace("fairy", { gender: "female" });
            console.log(tree.Name)
        }

        // Update the user's leafs
        user.Leafs -= tree.Price;
        await usersDB.updateUserLeavesBalance(user.IdUsers, user.Leafs);

        // Change the owner of the tree
        tree.Owner = user.IdUsers;
        console.log(tree.Owner)
        await treeDb.updateOwnerAndName(tree);

        // Add the logs
        await logsDB.insertLog(logBuy);

        res.status(200).send(logBuy);
    }
    else {
        res.status(400).send({message : "Not enough leaves"});
    }


});

module.exports = router;