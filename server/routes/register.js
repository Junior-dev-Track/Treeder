const express = require('express');
const router = express.Router();
const DataBase = require ('../model/DataBase')

router.post('/', async (req, res) => {

    let dataUser = req.body;
    let db = new DataBase()
    console.log(dataUser)
    //await db.query(`INSERT INTO Users (Pseudo, Password, Mail) VALUES ('${dataUser.Pseudo}', '${dataUser.Password}', '${dataUser.Mail}')`)

    res.send("The data has been received!");
});

module.exports = router;