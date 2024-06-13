const express = require('express');
const DataBase = require("../model/DataBase");
const bcrypt = require("bcrypt");
const UserDB = require("../model/UserDB");
const router = express.Router();

router.post('/', async (req, res) => {

    const db = new DataBase()
    const userDb = new UserDB(db);
    let dataUser = req.body;

    // vérifier les données
    if(!(dataUser.Pseudo || dataUser.Mail) || !dataUser.Password){
        return res.status(400).send('Invalid data');
    }

    // vérifier si le user existe
    let user = await userDb.getUser(dataUser);
    if(user.length === 0){
        return res.status(400).send('User doesn\'t exists');
    }
    user = user[0];
    console.log(user)

    // vérifier le mdp
    if(!bcrypt.compareSync(dataUser.Password, user.Password)){
        return res.status(400).send('Invalid password');
    }
    else {
        // créer un token
        let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        await userDb.insertToken(token, user.IdUsers);

        let data = {
            IdUsers: user.IdUsers,
            Pseudo: user.Pseudo,
            Mail: user.Mail,
            Token: token
        };

        res.status(200).send(data);
    }

});

module.exports = router;