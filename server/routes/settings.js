const express = require('express');
const router = express.Router();
const UserDB = require('../model/UserDB');
const DataBase = require ('../model/DataBase')
const {authenticateToken} = require("../middleware/authenticateToken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post('/', authenticateToken, async (req, res) => {

    let dataUser = req.body
    console.log(dataUser)

    let usersDB = new UserDB(new DataBase())

    // data user pseudo et mail - trim sur les espaces blancs

    dataUser.Pseudo = dataUser.Pseudo.trim();
    dataUser.Mail = dataUser.Mail.trim();
    dataUser.Password = dataUser.Password.trim();

    if (!dataUser.Pseudo || !dataUser.Mail) {
        console.log(dataUser);
        return res.status(400).send('Invalid data');
    }

    // verifier la force du mdp

    if (dataUser.Password) {
        let regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
        if (!dataUser.Password.trim().match(regex)) {
            return res.status(400).send('Invalid password');
        }
        else {
            let salt = await bcrypt.genSalt(saltRounds);
            dataUser.Password = await bcrypt.hash(dataUser.Password.trim(), salt);
        }
    }
    

    // TODO : vérifier que l'user n'existe pas déjà en dehors de lui même
    let user = await usersDB.verifyUser(dataUser);
    // exemple : user = [{IdUsers: 1, Pseudo: 'Kriidfel', Mail: 'test@test.com'}]
    //          dataUser = [{ IdUsers: 1, Pseudo: 'Kriidfel', Mail: 'test1@test.com'}]
    //si j'ai les mêmes données que mon exemple  je dois update mon user

    if (user.length > 0) {
        if (user[0].IdUsers !== dataUser.IdUsers) {
            return res.status(400).send('User already exists');
        }
    }

    let users = await usersDB.updateUser(dataUser);

    res.status(200).send(users);
});

module.exports = router;