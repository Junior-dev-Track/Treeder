class UserDB{

    constructor(dataBase){
        this.dataBase = dataBase;
    }

    async insertUser(dataUser){
        return !!(await this.dataBase.query(`INSERT INTO Users (Pseudo, Password, Mail, Leafs, SkinPlayer) VALUES ('${dataUser.Pseudo}', '${dataUser.Password}', '${dataUser.Mail}', '${dataUser.Leafs}', '${dataUser.SkinPlayer}')`));
    }

    async getUser(dataUser){
        if (dataUser.IdUsers){
            return await this.dataBase.query(`SELECT IdUsers,Pseudo,Mail,NbTrees,Leafs,SkinPlayer,SkinTrees,Admin FROM Users WHERE IdUsers = '${dataUser.IdUsers}'`);
        }
        return await this.dataBase.query(`SELECT IdUsers,Pseudo,Mail,NbTrees,Leafs,SkinPlayer,SkinTrees,Admin FROM Users WHERE Pseudo = '${dataUser.Pseudo}'`);
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
        return !!(await this.dataBase.query(`DELETE FROM Users WHERE IdUsers = '${dataUser.IdUsers}'`));
    }

    async updateUser(dataUser){
        return !!(await this.dataBase.query(`UPDATE Users SET Pseudo = '${dataUser.Pseudo}', Password = '${dataUser.Password}', Mail = '${dataUser.Mail}' WHERE IdUsers = '${dataUser.IdUsers}'`));
    }

    async getScore() {
        return await this.dataBase.query(`SELECT U.IdUsers, U.Pseudo, U.Leafs, COUNT(T.Owner) AS NbTrees FROM Users AS U JOIN Trees T ON U.IdUsers = T.Owner GROUP BY U.IdUsers ORDER BY U.Leafs`);
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


    async getUserDatas() {
        return await this.dataBase.query(`
        SELECT Users.*, COUNT(Trees.Owner) AS NbTrees, Logs.*
        FROM Users 
        LEFT JOIN Logs ON Users.IdUsers = Logs.User 
        LEFT JOIN Trees ON Users.IdUsers = Trees.Owner
        WHERE Users.IdUsers = '${dataUser.IdUsers}'
        GROUP BY Users.IdUsers
    `);

    }
}

module.exports = UserDB;