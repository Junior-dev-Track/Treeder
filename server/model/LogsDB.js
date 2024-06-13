class LogsDB {

    constructor(dataBase) {
        this.dataBase = dataBase
    }

    async insertLog(dataLogs) {
        return await this.dataBase.query(`INSERT INTO Logs (Log, User, Date, Categorie) VALUES ('${dataLogs.Log}','${dataLogs.User}', '${dataLogs.Date}', '${dataLogs.Categorie}')`)
    }

    async getLog(dataLogs) {
        return await this.dataBase.query(`SELECT * FROM Logs WHERE IdLogs = ${dataLogs.IdLogs}`)
    }

    async deleteLog(dataLogs) {
        return await this.dataBase.query(`DELETE * FROM Logs WHERE IdLogs = ${dataLogs.IdLogs}`)
    }

    async updateLog(dataLogs) {
        return await this.dataBase.query(`UPDATE Logs SET Logs = '${dataLogs.Log}', User = '${dataLogs.User}', Date = '${dataLogs.Date}', Categorie = '${dataLogs.Categorie}')`)
    }
}