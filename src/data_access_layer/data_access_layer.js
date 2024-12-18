const mysql = require('mysql2/promise');

class DataAccessLayer {
    constructor() {
        this._connection = null;
    }

    async initConnection(dbUser, dbPassword, dbHost, dbPort, dbName) {
        const connectionOptions = {
            user: dbUser,
            password: dbPassword,
            host: dbHost,
            port: dbPort,
            database: dbName,
        };

        this._connection = await mysql.createConnection(connectionOptions);
    }

    async endConnection(){
        await this._connection.end();
    }

}

module.exports = { DataAccessLayer };