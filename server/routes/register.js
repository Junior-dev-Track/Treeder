const express = require('express');
const router = express.Router();
const DataBase = require ('../model/DataBase')
const UserDB = require('../model/UserDB');
const TreeDB = require('../model/TreeDB')
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/', async (req, res) => {

    let dataUser = req.body;
    let userDB = new UserDB(new DataBase());
    let treeDB = new TreeDB(new DataBase());

    // vérifier les données
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
    let user = await userDB.getUser(dataUser);
    if (user.length > 0) {
        return res.status(400).send('User already exists');
    }

    // créer l'user
    console.log(dataUser)
    if(await userDB.insertUser(dataUser)){
        res.status(200).send('User created');
    }
    else{
        res.status(400).send('User not created');
    }

});

module.exports = router;