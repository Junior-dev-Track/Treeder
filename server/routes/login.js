const express = require('express');
const DataBase = require("../model/DataBase");
const router = express.Router();

router.post('/', async (req, res) => {

    const db = new DataBase()
 
    const { username, password } = req.body;
    const hashPassword = await db.query(`SELECT Password FROM Users WHERE Username = ${username}`)

    if (!username) {
        return res.status(400).send('Invalid username or password');
    }
    
    const decryptedPassword = decryptData(password, secretKey)


    if (decryptedPassword != req.body.password) {
        return res.status(400).send('Invalid email or password');
      }
    
});

module.exports = router;