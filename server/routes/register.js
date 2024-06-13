const express = require('express');
const router = express.Router();
const DataBase = require ('../model/DataBase')

router.post('/', async (req, res) => {

    let dataUser = req.body;
    let db = new DataBase()
    console.log(dataUser)

    

    // vérifier les injections sql / js
    // nettoyer les espaces blancs
    // vérifier que l'user n'existe pas déjà
    // vérfier les mdp
    // vérifier la force du mdp (si temps)
    // envoyer les données 



    //await db.query(`INSERT INTO Users (Pseudo, Password, Mail) VALUES ('${dataUser.Pseudo}', '${dataUser.Password}', '${dataUser.Mail}')`)

    res.send("The data has been received!");
});

module.exports = router;