const express = require('express');
const DataBase = require("../model/DataBase");
const bcrypt = require("bcrypt");
const UserDB = require("../model/UserDB");
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {

    const userDb = new UserDB(new DataBase());
    let dataUser = req.body;

    // vérifier les données
    if(!(dataUser.Pseudo || dataUser.Mail) || !dataUser.Password){
        return res.status(400).send('Invalid data');
    }

    // vérifier si l'user existe
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
        // créer deux token (un pour l'authentification et un pour le refresh)
        const accessToken = jwt.sign({IdUsers: user.IdUsers}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
        const refreshToken = jwt.sign({IdUsers: user.IdUsers}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'});

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None', secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        let data = {
            IdUsers: user.IdUsers,
            Pseudo: user.Pseudo,
            Leafs: user.Leafs,
            NbTrees: user.NbTrees,
            SkinTrees: user.SkinTrees,
            SkinPlayer: user.SkinPlayer,
            Admin: user.Admin,
            Token: accessToken
        };

        res.status(200).send(data);
    }

});

module.exports = router;