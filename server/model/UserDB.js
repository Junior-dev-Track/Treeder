class UserDB{

    constructor(dataBase){
        this.dataBase = dataBase;
    }

    async insertUser(dataUser){
        return !!(await this.dataBase.query(`INSERT INTO Users (Pseudo, Password, Mail) VALUES ('${dataUser.Pseudo}', '${dataUser.Password}', '${dataUser.Mail}')`));
    }

    async getUser(dataUser){
        if (dataUser.Pseudo){
            return await this.dataBase.query(`SELECT * FROM Users WHERE Pseudo = '${dataUser.Pseudo}'`);
        }
        return await this.dataBase.query(`SELECT * FROM Users WHERE IdUsers = '${dataUser.IdUsers}'`);
    }

    async deleteUser(dataUser){
        return !!(await this.dataBase.query(`DELETE FROM Users WHERE IdUsers = '${dataUser.IdUsers}'`));
    }

    async updateUser(dataUser){
        return !!(await this.dataBase.query(`UPDATE Users SET Pseudo = '${dataUser.Pseudo}', Password = '${dataUser.Password}', Mail = '${dataUser.Mail}' WHERE IdUsers = '${dataUser.IdUsers}'`));
    }

}

module.exports = UserDB;