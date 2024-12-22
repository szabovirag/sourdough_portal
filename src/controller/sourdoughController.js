const {dataAccessLayer} = require("../dataAccess.js");
const path = require('path');

exports.getSourdoughPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/sourdough.html'));
};

exports.getAllSourdoughs = async (req, res) => {
    try {
        const sourdoughs = await dataAccessLayer.getAllSourdoughs();
        res.status(200).json({
            status: 'success',
            data: sourdoughs,
        });
    } catch (error) {
        console.error('Hiba az összes kovász lekérésekor:', error);
        res.status(500).json({
            status: 'error',
            message: 'Hiba történt az összes kovász lekérésekor.',
        });
    }
};

exports.getSourdoughByID = async (req, res) => {
    const { id } = req.params;
    try {
        const sourdough = await dataAccessLayer.getSourdoughLogById(id);
        if (!sourdough) {
            return res.status(404).json({
                status: 'fail',
                message: 'Nem található ilyen ID-val rendelkező kovász.',
            });
        }
        res.status(200).json({
            status: 'success',
            data: sourdough,
        });
    } catch (error) {
        console.error('Hiba a kovász ID alapján történő lekérésekor:', error);
        res.status(500).json({
            status: 'error',
            message: 'Hiba történt a kovász ID alapján történő lekérésekor.',
        });
    }
};

exports.getSourdoughByUserID = async (req, res) => {
    const { id } = req.params;
    try {
        const sourdough = await dataAccessLayer.getAllSourdoughLogsByUser(id);
        if (!sourdough) {
            return res.status(404).json({
                status: 'fail',
                message: 'Kovász nem található.',
            });
        }
        res.status(200).json({
            status: 'success',
            data: sourdough,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Hiba történt a kovász lekérésekor.',
        });
    }
};

exports.addSourdough = async (req, res) => {
    const { name, hydrationLevel, position, userID, last_fed } = req.body;
    try {
        const newSourdough = await dataAccessLayer.createSourdoughLog(userID, name, hydrationLevel, position, last_fed);
        res.status(201).json({
            status: 'success',
            data: {
                id: newSourdough,
                name: name,
                hydrationLevel: hydrationLevel,
                position: position,
                userID: userID,
                last_fed: last_fed
            },
        });
    } catch (error) {
        console.error('Hiba az új kovász hozzáadásakor:', error);
        res.status(500).json({
            status: 'error',
            message: 'Hiba történt az új kovász hozzáadásakor.',
        });
    }
};

exports.updateSourdough = async (req, res) => {
    const { id } = req.params;
    const { name, hydrationLevel, position, last_fed } = req.body;
    try {
        const updatedSourdough = await dataAccessLayer.updateSourdoughLog(id, name, hydrationLevel, position, last_fed);
        if (!updatedSourdough) {
            return res.status(404).json({
                status: 'fail',
                message: 'Nem található ilyen ID-val rendelkező kovász.',
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                id: id,
                name: name,
                hydrationLevel: hydrationLevel,
                position: position,
                last_fed: last_fed
            },
        });
    } catch (error) {
        console.error('Hiba a kovász frissítésekor:', error);
        res.status(500).json({
            status: 'error',
            message: 'Hiba történt a kovász frissítésekor.',
        });
    }
};

exports.deleteSourdough = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await dataAccessLayer.deleteSourdoughLog(id);
        if (!deleted) {
            return res.status(404).json({
                status: 'fail',
                message: 'Nem található ilyen ID-val rendelkező kovász.',
            });
        }
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (error) {
        console.error('Hiba a kovász törlésekor:', error);
        res.status(500).json({
            status: 'error',
            message: 'Hiba történt a kovász törlésekor.',
        });
    }
};