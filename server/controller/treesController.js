const TreesDB = require('../model/TreeDB');
const DataBase = require('../model/DataBase');

class treesController {
    constructor(){
        this.treesDB = new TreesDB(new DataBase());
    }


    async getTreesByRadius (tree)  {
        return await this.treesDB.getTreesRadius(tree.Lat, tree.Lon, 100);
    }

    treeValue(tree){

        return Math.round(tree.TotHight * tree.DiaLeafs);
    }

    async treePrice(tree, user){
        //verify if the tree have an owner
        if(!tree.Owner){
            return this.treeValue(tree);
        }

        const treeInRadius = await this.getTreesByRadius(tree);

        //value of the targetted tree
        const targetedValue = this.treeValue(tree);
        //value of all the targetted player's trees in 100m radius
        const targetedPlayerTrees = treeInRadius.filter(t => t.Owner === tree.Owner);
        const targetedPlayerTreesValue = targetedPlayerTrees.reduce((sum, t) => sum + this.treeValue(t), 0);
        //amount of trees in 100m radius
        const amountTargetedPlayerTrees = treeInRadius.length;
        //value of all the other players trees in 100m radius
        const otherPlayersTrees = treeInRadius.filter(t => t.Owner !== tree.Owner && t.Owner !== user.IdUsers);
        const otherPlayersTreesValue = otherPlayersTrees.reduce((sum, t) => sum + this.treeValue(t), 0);
        //value of all your tree in 100m radius
        const yourTrees = treeInRadius.filter(t => t.Owner === user.IdUsers);
        const yourTreesValue = yourTrees.reduce((sum, t) => sum + this.treeValue(t), 0);


        return targetedValue + (targetedPlayerTreesValue * (treeInRadius.length / amountTargetedPlayerTrees)) + otherPlayersTreesValue - yourTreesValue;
    }

    async lockTree(tree){
        //check if the tree have an owner
        if(!tree.Owner){
            return -1;
        }

       //[value of the tree] × 10
        const value = this.treeValue(tree) * 10;
        // [value of all the trees in 100m radius]
        const treeInRadius = await this.getTreesByRadius(tree, 100);
        // [amount of players in 100m radius]
        const amountPlayers = treeInRadius.filter(t => t.Owner !== null).length;
        // [value of all player's trees in 100m radius]
        const playerTrees = treeInRadius.filter(t => t.Owner !== null).reduce((sum, t) => sum + this.treeValue(t), 0);

        //[value of the tree] × 10 + ([value of all the trees in 100m radius] × [amount of players in 100m radius]) - ([value of all player's trees in 100m radius] / [amount of players in 100m radius])
        return value + (playerTrees * amountPlayers) - (playerTrees / amountPlayers);
    }

}

module.exports = treesController;
