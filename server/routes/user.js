const express = require('express');
const router = express.Router();
const UserDB = require('../model/UserDB');
const DataBase = require ('../model/DataBase')
const {authenticateToken} = require("../middleware/authenticateToken");
const LogsDb = require("../model/LogsDB");

router.get('/',authenticateToken, async (req, res) => {

    let usersDB = new UserDB(new DataBase())
    let logsDB = new LogsDb(new DataBase())
    let userData = { IdUsers: req.query.IdUser};

    let rawUsers = await usersDB.getUserDatas(userData);
    let logs = await logsDB.getLogForOneUser(userData);
    console.log(rawUsers)

    let users = rawUsers.map(user => {
        return {
            IdUsers: user.IdUsers,
            Pseudo: user.Pseudo,
            Mail: user.Mail,
            Leafs: user.Leafs,
            SkinPlayer: user.SkinPlayer,
            SkinTrees: user.SkinTrees,
            Admin: user.Admin,
            NbTrees: user.NbTrees,
            Logs: logs
        }});

    res.status(200).send(users);
});

router.put('/:IdUser', authenticateToken, async (req, res) => {
    const userId = req.params.IdUser;
    const updates = req.body; // Assuming the body contains the fields to be updated

    console.log(updates)
    try {
        let usersDB = new UserDB(new DataBase());
        // Assuming updateUser is a method you've defined to update user data
        const updatedUser = await usersDB.update({ ...updates, IdUsers: userId });

        if (updatedUser) {
            res.status(200).json({ message: 'User updated successfully'});
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
});

module.exports = router;