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
        return res.status(400).send({message:"All field are required", type:"global"});
    }

    // vérifier que l'user n'existe pas déjà
    let user = await userDB.verifyUser(dataUser);
    if (user.length > 0) {
        return res.status(400).send({ message: 'User already exists', type:"username" });
    }

    // verifier la force du mdp
    let regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
    if (!dataUser.Password.trim().match(regex)) {
        return res.status(400).send({message:"Password must contain a lowercase and uppercase letter, a number and one of the following character : #?!@$%^&*-", type:"password" });
    }
    else {
        let salt = await bcrypt.genSalt(saltRounds);
        dataUser.Password = await bcrypt.hash(dataUser.Password.trim(), salt);
    }

    // créer l'user
    dataUser.Leafs  = await userDB.getAverageLeaves();
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
            Mail: userLogin.Mail,
            Leafs: userLogin.Leafs,
            Locks: userLogin.Locks,
            SkinTrees: userLogin.SkinTrees,
            SkinPlayer: userLogin.SkinPlayer,
            Admin: userLogin.Admin,
            Token: accessToken
        };

        let trees = await treeDB.getRandomTrees();

        for(let tree of trees) {
            const name = nameGenerator.nameByRace("fairy", { gender: "female" });
            await treeDB.assignUserAndNameToTree(userLogin, name, tree);
        }

        res.status(200).send(data);

    }
    else{
        res.status(400).send({message:"Unexpected error, please try again", type:"global"});
    }

});

module.exports = router;