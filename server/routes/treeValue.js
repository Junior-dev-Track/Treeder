const express = require('express');
const router = express.Router();
const DataBase = require('../model/DataBase');
const TreeDB = require('../model/TreeDB');
const UserDB = require('../model/UserDB');
const treeController = require('../controller/treesController');

router.get('/', async (req, res) => {


    let treeId = { IdTrees: Number(req.query.IdTree)};
    let user = { IdUsers: Number(req.query.IdUsers)};
    const treeControllerInstance = new treeController();

    const treeDB = new TreeDB(new DataBase());
    const userDb = new UserDB(new DataBase());

    let tree = await treeDB.getTree(treeId);

    let values = await treeControllerInstance.treeValue(tree[0]);
    let price = await treeControllerInstance.treePrice(tree[0], user);
    let lock = await treeControllerInstance.lockTree(tree[0]);
    let skinPlayer = await userDb.getSkins(tree[0]);

    // Vérifier si skinPlayer[0] existe avant d'accéder à ses propriétés
    if (skinPlayer[0] && !skinPlayer[0].SkinPlayer) {
        skinPlayer[0].SkinPlayer = null;
    } else if (!skinPlayer[0]) {
        // Si skinPlayer[0] n'existe pas, initialiser skinPlayer[0] avec des valeurs par défaut
        skinPlayer[0] = { SkinPlayer: null, SkinTrees: null };
    }
    
    let allValues = {
        value: values,
        price: price,
        lock: lock,
        skinPlayer: skinPlayer[0].SkinPlayer
    };
    
    res.status(200).send(allValues);
});

module.exports = router;