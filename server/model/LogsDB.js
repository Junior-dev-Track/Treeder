class LogsDB {

    constructor(dataBase) {
        this.dataBase = dataBase
    }

    async insertLog(dataLogs) {
        return await this.dataBase.query(`INSERT INTO Logs (Log, User, Date, Categorie) VALUES ('${dataLogs.Log}','${dataLogs.User}', '${dataLogs.Date}', '${dataLogs.Categorie}')`)
    }

    async getLogPlayer() {
        //sort them by date the most recent first
        return await this.dataBase.query(`SELECT * FROM Logs JOIN Users ON Logs.User = Users.IdUsers ORDER BY Logs.Date DESC`)
    }

    async getLogAdmin() {
        return await this.dataBase.query(`SELECT * FROM Logs JOIN Users ON Logs.User = Users.IdUsers`)
    }

    async getAllLog() {
        return await this.dataBase.query(`SELECT * FROM Logs`)
    }

    async deleteLog(dataLogs) {
        return await this.dataBase.query(`DELETE FROM Logs WHERE IdLogs = ${dataLogs.IdLogs}`)
    }

    async updateLog(dataLogs) {
        return await this.dataBase.query(`UPDATE Logs SET Log = '${dataLogs.Log}', User = '${dataLogs.User}', Date = '${dataLogs.Date}', Categorie = '${dataLogs.Categorie}')`)
    }

    async getLogForOneUser(userData) {
        return await this.dataBase.query(`SELECT
                                              Logs.Date AS LogDate,
                                              Logs.Categorie AS LogCategory,
                                              Logs.Log AS LogMessage
                                          FROM Logs
                                          WHERE Logs.User = ${userData.IdUsers}
                                          ORDER BY Logs.Date DESC;`)
    }
}

module.exports = LogsDB;