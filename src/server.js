const { initDataAccessLayer, dataAccessLayer } = require('./dataAccess');
const app = require('./index');

async function initializeServer() {
    try {
        await initDataAccessLayer();

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
