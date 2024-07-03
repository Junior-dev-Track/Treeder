// Description: This file contains the DataBase class which is used to connect to the database and execute queries.
const mysql = require('mysql2/promise');
require('dotenv').config();

class DataBase {
    constructor() {
        this.host = process.env.DB_HOST;
        this.user = process.env.DB_USER;
        this.password = process.env.DB_PASSWORD;
        this.db = process.env.DB_NAME;
    }

    async createConnection() {
        const connection = await mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.db
        });

        return connection;
    }

    async query(sql, values) {
        const connection = await this.createConnection();
        const [rows] = await connection.execute(sql, values);
        await connection.end();
        return rows;
    }
}
module.exports = DataBase;