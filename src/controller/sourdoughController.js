const {dataAccessLayer} = require("../dataAccess.js");
const path = require('path');

exports.getSourdoughPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/sourdough.html'));
};

exports.getAllSourdoughs = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: 'null',
    });
}

exports.getSourdoughByID = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: 'null',
    });
}

exports.addSourdough = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: 'null',
    });
}

exports.updateSourdough = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: 'null',
    });
}

exports.deleteSourdough = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: 'null',
    });
}