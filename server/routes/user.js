const express = require('express');
const router = express.Router();
const UserDB = require('../model/UserDB');
const DataBase = require ('../model/DataBase')
const {authenticateToken} = require("../middleware/authenticateToken");

router.get('/',authenticateToken, async (req, res) => {

    let usersDB = new UserDB(new DataBase())
    let userData = { IdUsers: req.query.IdUser};

    let rawUsers = await usersDB.getUserDatas(userData);

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
            Logs: user.LogDate ? user.LogDate.split(',').map((date, index) => {
                return {
                    LogDate: date,
                    LogCategories: user.LogCategories.split(',')[index],
                    LogMessages: user.LogMessages.split(',')[index]
                }
            }) : []
        }
    });


    res.status(200).send(users);
});

module.exports = router;