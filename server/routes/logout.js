const express = require('express');
const DataBase = require("../model/DataBase");
const bcrypt = require("bcrypt");
const UserDB = require("../model/UserDB");
const router = express.Router();


router.post('/', (req, res) => {
    req.session
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res.status(400).send('Unable to log out')
        } else {
          res.send('Logout successful')
        }
      });
    } else {
        res.status(400).send('Not login')
        res.end()
        
    }
  })

module.exports = router;