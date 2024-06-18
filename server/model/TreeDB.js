class TreeDB{

    constructor(dataBase){
        this.dataBase = dataBase;
    }

    async insertTree(dataTree){
        return !!(await this.dataBase.query(`INSERT INTO Trees (IdTrees, Lat, Lon, TotHight, DiaLeafs, Species) VALUES ('${dataTree.IdTrees}', '${dataTree.Lat}', '${dataTree.Lon}', '${dataTree.TotHight}', '${dataTree.DiaLeafs}', '${dataTree.Species}')`));
    }

    async getTree(dataTree){
        return await this.dataBase.query(`SELECT * FROM Trees WHERE IdTrees = '${dataTree.IdTrees}'`);
    }

    async getTrees(){
        return await this.dataBase.query('SELECT * FROM Trees');
    }

    async getTreesByPosition(minLat, maxLat, minLon, maxLon) {
        return await this.dataBase.query(`SELECT * FROM Trees WHERE Lat BETWEEN '${minLat}' AND '${maxLat}' AND Lon BETWEEN '${minLon}' AND '${maxLon}'`);
    }

}

module.exports = TreeDB;