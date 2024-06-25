const express = require('express');
const router = express.Router();
const DataBase = require ('../model/DataBase')
const UserDB = require('../model/UserDB');
const TreeDB = require('../model/TreeDB')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const nameGenerator = require ("fantasy-name-generator")

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
    let user = await userDB.verifyUser(dataUser);
    if (user.length > 0) {
        return res.status(400).send('User already exists');
    }

    // créer l'user
    console.log(dataUser)
    if(await userDB.insertUser(dataUser)){
        let userLogin = await userDB.getUser(dataUser);
        userLogin = userLogin[0];

        const accessToken = jwt.sign({IdUsers: user.IdUsers}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
        const refreshToken = jwt.sign({IdUsers: user.IdUsers}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'});

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None', secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        let data = {
            IdUsers: userLogin.IdUsers,
            Pseudo: userLogin.Pseudo,
            Leafs: userLogin.Leafs,
            NbTrees: userLogin.NbTrees,
            SkinTrees: userLogin.SkinTrees,
            SkinPlayer: userLogin.SkinPlayer,
            Admin: userLogin.Admin,
            Token: accessToken
        };

        // Fetch three random trees
        let trees = await treeDB.getRandomTrees();
        // Assign the trees to the user
        for(let tree of trees) {
            console.log(tree, userLogin)
            const name = nameGenerator.nameByRace("fairy", { gender: "female" });
            await treeDB.assignUserAndNameToTree(userLogin, name, tree);
        }


        // [total leaves of players] / [amount of players]

        res.status(200).send(data);

    }
    else{
        res.status(400).send('User not created');
    }

});

module.exports = router;