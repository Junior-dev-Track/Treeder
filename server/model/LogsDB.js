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
}