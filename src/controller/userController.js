const {dataAccessLayer} = require("../dataAccess.js");
const path = require('path');

exports.getRegistrationPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/registration.html'));
};

exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/login.html'));
};

exports.getAllUsers = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: 'null',
    });
}

exports.getUserByID = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: 'null',
    });
}

exports.getUserByUsername = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: 'null',
    });
}

exports.addUser = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: 'null',
    });
}

exports.registerUser = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: 'null',
    });
}

exports.loginUser = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: 'null',
    });
}

exports.updateUser = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: 'null',
    });
}

exports.deleteUser = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: 'null',
    });
}

