const express = require('express');
const router = express.Router();
const UserDB = require('../model/UserDB');
const DataBase = require ('../model/DataBase')
const {authenticateToken} = require("../middleware/authenticateToken");
const bcrypt = require("bcrypt");

router.post('/', authenticateToken, async (req, res) => {

    let dataUser = req.body

    let usersDB = new UserDB(new DataBase())

    // data user pseudo et mail - trim sur les espaces blancs

    dataUser.Pseudo = dataUser.Pseudo.trim();
    dataUser.Mail = dataUser.Mail.trim();
    dataUser.Password = dataUser.Password.trim();

    if (!dataUser.Pseudo || !dataUser.Password || !dataUser.Mail) {
        return res.status(400).send('Invalid data');
    }

    // verifier la force du mdp
    let regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
    if (!dataUser.Password.trim().match(regex)) {
        return res.status(400).send('Invalid password');
    }
    else {
        let salt = await bcrypt.genSalt(saltRounds);
        dataUser.Password = await bcrypt.hash(dataUser.Password.trim(), salt);
    }

    // vérifier que l'user n'existe pas déjà
    let user = await userDB.verifyUser(dataUser);
    if (user.length > 0) {
        return res.status(400).send('User already exists');
    }

    let users = await usersDB.updateUser(dataUser);

    res.status(200).send(users);
});

module.exports = router;