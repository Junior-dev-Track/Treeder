class UserDB{

    constructor(dataBase){
        this.dataBase = dataBase;
    }

    async insertUser(dataUser){
        return !!(await this.dataBase.query(`INSERT INTO Users (Pseudo, Password, Mail, Leafs,SkinTrees, SkinPlayer) VALUES ('${dataUser.Pseudo}', '${dataUser.Password}', '${dataUser.Mail}', '${dataUser.Leafs}', 'tree-own.png' , '${dataUser.SkinPlayer}')`));
    }

    async getUser(dataUser){
        if (dataUser.IdUsers){
            return await this.dataBase.query(`SELECT IdUsers,Pseudo,Mail,Leafs,Locks,SkinPlayer,SkinTrees,Admin FROM Users WHERE IdUsers = '${dataUser.IdUsers}'`);
        }
        return await this.dataBase.query(`SELECT IdUsers,Pseudo,Mail,Leafs,Locks,SkinPlayer,SkinTrees,Admin FROM Users WHERE Pseudo = '${dataUser.Pseudo}'`);
    }

    async authentication(dataUser){
        if (dataUser.Pseudo){
            return await this.dataBase.query(`SELECT IdUsers, Pseudo, Password FROM Users WHERE Pseudo = '${dataUser.Pseudo}'`);
            
        }
        return await this.dataBase.query(`SELECT IdUsers, Pseudo, Password FROM Users WHERE IdUsers = '${dataUser.IdUsers}'`);s
    }

    async getAllUser(){
        return await this.dataBase.query(`SELECT * FROM Users`);
    }


    async deleteUser(dataUser){
        await this.dataBase.query(`UPDATE Trees SET Owner = NULL WHERE Owner = '${dataUser.IdUsers}'`);
        await this.dataBase.query(`DELETE FROM Logs WHERE User = '${dataUser.IdUsers}'`);
        await this.dataBase.query(`DELETE FROM Users WHERE IdUsers = '${dataUser.IdUsers}'`);
        return true;
    }

    async updateUser(dataUser){
        if (dataUser.Password){
            return !!(await this.dataBase.query(`UPDATE Users SET Pseudo = '${dataUser.Pseudo}', Password = '${dataUser.Password}', Mail = '${dataUser.Mail}', SkinPlayer = '${dataUser.SkinPlayer}' WHERE IdUsers = '${dataUser.IdUsers}'`));
        }
        return !!(await this.dataBase.query(`UPDATE Users SET Pseudo = '${dataUser.Pseudo}', Mail = '${dataUser.Mail}', SkinPlayer = '${dataUser.SkinPlayer}' WHERE IdUsers = '${dataUser.IdUsers}'`));
    }

    async getScore() {
        // i want my users to be sorted by the number of trees they have and then if they have the same number of tree sort by their leafs
        return await this.dataBase.query(`SELECT IdUsers, Pseudo, Leafs, SkinPlayer, SkinTrees, Admin, COUNT(Trees.Owner) AS NbTrees FROM Users LEFT JOIN Trees ON Users.IdUsers = Trees.Owner GROUP BY IdUsers, Pseudo, Leafs, SkinPlayer, SkinTrees, Admin ORDER BY NbTrees DESC, Leafs DESC`);
    }

    async getUserWithLog(dataUser) {

        return await this.dataBase.query(`SELECT * FROM Users JOIN Logs ON Users.IdUsers=Logs.User WHERE IdUsers = '${dataUser.IdUsers}'`)
    }

    async verifyUser(dataUser) {
        return await this.dataBase.query(`SELECT * FROM Users WHERE Pseudo = '${dataUser.Pseudo}' OR Mail = '${dataUser.Mail}'`);
    }

    async getAverageLeaves() {
        const query = "SELECT ROUND(AVG(Leafs)) as averageLeaves FROM Users";
        const result = await this.dataBase.query(query);
        return result[0].averageLeaves;
    }


    async getUserDatas(dataUser) {
        console.log(dataUser)
    return await this.dataBase.query(`
        SELECT
            Users.IdUsers,
            Users.Pseudo,
            Users.Mail,
            Users.Leafs,
            Users.SkinPlayer,
            Users.SkinTrees,
            Users.Admin,
            COUNT(DISTINCT Trees.Owner) AS NbTrees
        FROM Users
                 LEFT JOIN Trees ON Users.IdUsers = Trees.Owner
        WHERE Users.IdUsers = '${dataUser.IdUsers}'
        GROUP BY
            Users.IdUsers,
            Users.Pseudo,
            Users.Mail,
            Users.Leafs,
            Users.SkinPlayer,
            Users.SkinTrees,
            Users.Admin;
        `);
    }

    async getLeafs(dataUser) {
        return await this.dataBase.query(`SELECT Leafs FROM Users WHERE IdUsers = '${dataUser.IdUsers}'`);
    }

    async updateUserLeavesBalance(IdUsers, leafs) {
        return !!(await this.dataBase.query(`UPDATE Users SET Leafs = '${leafs}' WHERE IdUsers = '${IdUsers}'`));
    }

    async getSkins(dataTree) {
        return await this.dataBase.query(`SELECT SkinPlayer, SkinTrees FROM Users WHERE IdUsers = '${dataTree.Owner}'`);
    }

    async update(param) {
        // Initialize the base of the update query
        let query = 'UPDATE Users SET ';
        const queryParams = [];
        let isFirstParam = true;

        // Iterate over the param object to dynamically build the query
        for (const [key, value] of Object.entries(param)) {
            if (key !== 'IdUsers') { // Exclude IdUsers from the update fields
                if (!isFirstParam) {
                    query += ', ';
                }
                query += `${key} = ?`;
                queryParams.push(value);
                isFirstParam = false;
            }
        }

        // Append the WHERE clause to target the correct record
        query += ' WHERE IdUsers = ?';
        queryParams.push(param.IdUsers);

        // Execute the query with parameterized values to prevent SQL injection
        return !!(await this.dataBase.query(query, queryParams));
    }

    async updateUserSkin(userData) {
        return !!(await this.dataBase.query(`UPDATE Users SET SkinTrees = '${userData.SkinTrees}' WHERE IdUsers = '${userData.IdUsers}'`));
    }
}

module.exports = UserDB;