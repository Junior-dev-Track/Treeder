const cron = require('node-cron');
const DataBase = require('../model/DataBase');
const UserDB = require('../model/UserDB');
const TreeDB = require('../model/TreeDB');
const treeController = require("../controller/treesController");

const dataBaseInstance = new DataBase();
const userDB = new UserDB(dataBaseInstance);
const treeDB = new TreeDB(dataBaseInstance);
const treeControllerInstance = new treeController();

function calculateLeavesForTree(tree) {
    return treeControllerInstance.treeValue(tree);
}

async function calculateAndPersistLeaves() {
    const users = await userDB.getAllUser();

    for (const user of users) {
        const trees = await treeDB.getTreesByUserId(user.IdUsers);
        let totalLeaves = 0;

        for (const tree of trees) {
            totalLeaves += calculateLeavesForTree(tree);
        }

        await userDB.updateUserLeavesBalance(user.IdUsers, user.Leafs + totalLeaves);
    }
}

async function calculateLeafsDecay() {
    const users = await userDB.getAllUser();

    for (const user of users) {
        let totalLeaves = user.Leafs;
        totalLeaves = Math.round(totalLeaves / 2);

        await userDB.updateUserLeavesBalance(user.IdUsers, totalLeaves);
    }
}

// Schedule the task to run every 15 minutes
cron.schedule('*/15 * * * *', async () => {
    console.log('Calculating and persisting leaves for all users');
    await calculateAndPersistLeaves();
});

// Schedule the task to run every hour
cron.schedule('0 * * * *', async () => {
    console.log('Calculating leaf decay for all users');
    await calculateLeafsDecay();
});