const { DataAccessLayer } = require('./data_access_layer/data_access_layer') ;
const dotenv = require('dotenv');
const app = require('./index');

dotenv.config({ path: './config.env' });

const DATABASE_HOST = 'localhost'
const DATABASE_PORT = 3306
const DATABASE_USER = 'root'
const DATABASE_PASSWORD = process.env.DB_PASSWORD
const DATABASE_NAME = process.env.DB_NAME

const dataAccessLayer = new DataAccessLayer();

async function initializeServer() {
    try {
        await dataAccessLayer.initConnection(DATABASE_USER,DATABASE_PASSWORD,DATABASE_HOST,DATABASE_PORT, DATABASE_NAME);
        console.log('DB connection successful');

        app.use((req, res, next) => {
            req.dataAccessLayer = dataAccessLayer;
            next();
        });

        const port = 8000;
        app.listen(port, () => {
            console.log(`App running on http://localhost:${port}`);
        });

    } catch (error) {
        console.error('Error when initializing database: ', error);
    }
}

initializeServer();

process.on('SIGINT', async () => {
    await dataAccessLayer.endConnection();
    console.log('DB connection ended');
    process.exit();
});

module.exports = {dataAccessLayer};