const TreesDB = require('./model/TreeDB');
const DataBase = require('./model/DataBase');


class DeleteTree {
    constructor() {
        this.database = new DataBase()
        this.tree = new TreesDB(this.database);
    }

    async deleteTree(lat, lon) {
        const trees = await this.tree.getTreesRadius(lat, lon, 700);
            const percentage = trees.length / 100 * 30;

            for (let i = 0; i < percentage; i++) {
                const randomTree = trees[Math.floor(Math.random() * trees.length)];
                await this.database.query(`DELETE FROM Trees WHERE IdTrees = '${randomTree.IdTrees}'`);
            }
        }
    }
}


const tree = new DeleteTree()
tree.deleteTree(50.633609771728516, 5.610004425048828)



