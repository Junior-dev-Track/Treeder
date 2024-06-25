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

    async getRandomTrees() {
        const query = "SELECT * FROM Trees ORDER BY RAND() LIMIT 3";
        const trees = await this.dataBase.query(query);
        return trees;
    }

    async assignUserToTree(userLogin, tree) {
        const query = "UPDATE Trees SET Owner = ? WHERE IdTrees = ?";
        await this.dataBase.query(query, [userLogin.IdUsers, tree.IdTrees]);

    }

    async assignUserAndNameToTree(userLogin, name, tree) {
        const query = "UPDATE Trees SET Owner = ?, Name = ? WHERE IdTrees = ?";
        await this.dataBase.query(query, [userLogin.IdUsers, name, tree.IdTrees]);

    }
}

module.exports = TreeDB;