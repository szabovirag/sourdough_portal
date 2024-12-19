const {dataAccessLayer} = require("../dataAccess.js");
const path = require('path');

exports.getForumPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/forum.html'));
};

exports.getAllPosts = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: 'null',
    });
}

exports.getCommentsByPostID = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: 'null',
    });
}

exports.addPost = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: 'null',
    });
}

exports.addComment = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: 'null',
    });
}

exports.deletePost = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: 'null',
    });
}

exports.deleteComment = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: 'null',
    });
}