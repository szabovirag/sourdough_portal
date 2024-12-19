const { DataAccessLayer } = require('./data_access_layer/data_access_layer');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DATABASE_HOST = 'localhost';
const DATABASE_PORT = 3306;
const DATABASE_USER = 'root';
const DATABASE_PASSWORD = process.env.DB_PASSWORD;
const DATABASE_NAME = process.env.DB_NAME;

const dataAccessLayer = new DataAccessLayer();

async function initDataAccessLayer() {
    await dataAccessLayer.initConnection(DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT, DATABASE_NAME);
    console.log('DB connection successful');
}

module.exports = { dataAccessLayer, initDataAccessLayer };