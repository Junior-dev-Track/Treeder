const fs = require('fs');
const mysql = require('mysql2/promise');

class Database {

    constructor(host, user, password, db) {

      
        this.host = host 
        this.user = user
        this.password = password
        this.db = database
    
    }

    async create connection() {

        const connection = await mysql.createConnection({
            host:this.host,
            user:this.user,
            password:this.password,
            db:this.db
        });

        console.log('Connected to database')

        return connection

    }

    async query(sql, values) {
        const connection = await this.createConnection()
        const [rows] = await connection.execute(sql, values)
        await connection.end()
        return rows
    }

}