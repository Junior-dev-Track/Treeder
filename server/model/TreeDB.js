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

    async getTreesRadius(lat, lon, radius) {
        const radiusInKm = radius / 1000;
        return await this.dataBase.query(`SELECT t.IdTrees, t.TotHight, t.DiaLeafs, t.Owner FROM Trees AS t WHERE ( 6371 * acos( cos( radians(${lat}) ) * cos( radians( Lat ) ) * cos( radians( Lon ) - radians(${lon}) ) + sin( radians(${lat}) ) * sin( radians( Lat ) ) ) ) < ${radiusInKm}`);
    }

}

module.exports = TreeDB;