const express = require('express');
const router = express.Router();
const DataBase = require('../model/DataBase');
const TreeDB = require('../model/TreeDB');
const treeController = require('../controller/treesController');

router.get('/', async (req, res) => {


    let treeId = { IdTrees: Number(req.query.IdTree)};
    let user = { IdUsers: Number(req.query.IdUsers)};
    const treeControllerInstance = new treeController();

    const treeDB = new TreeDB(new DataBase());

    let tree = await treeDB.getTree(treeId);

    let values = await treeControllerInstance.treeValue(tree[0]);
    let price = await treeControllerInstance.treePrice(tree[0], user);
    let lock = await treeControllerInstance.lockTree(tree[0]);


    let allValues= {value: values, price: price, lock: lock};
    res.status(200).send(allValues);
});

module.exports = router;