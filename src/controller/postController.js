const {dataAccessLayer} = require("../dataAccess.js");
const path = require('path');

exports.getForumPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/forum.html'));
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await dataAccessLayer.getAllPosts();

        res.status(200).json({
            status: 'success',
            data: posts
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
}

exports.getCommentsByPostID = async (req, res) => {
    try {
        const { postID } = req.params;

        const post = await dataAccessLayer.getPostById(Number(postID));
        if (!post || post.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: `A megadott poszt (ID: ${postID}) nem található.`,
            });
        }

        const comments = await dataAccessLayer.getAllCommentsByPost(postID);

        res.status(200).json({
            status: 'success',
            data: comments
        });
    } catch (error){
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
}

exports.addPost = async (req, res) => {
    try {
        const { text, userID } = req.body;
        if (!text || !userID) {
            return res.status(400).json({
                status: 'fail',
                message: 'Missing text or userID.',
            });
        }

        await dataAccessLayer.createPost(userID, text);

        res.status(201).json({
            status: 'success',
            data: {
                userID: userID,
                text: text
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
}

exports.addComment = async (req, res) => {
    try {
        const { postID } = req.params;
        const { text, userID } = req.body;

        await dataAccessLayer.createComment(postID, userID, text);

        if ( !text || !userID) {
            return res.status(400).json({
                status: 'fail',
                message: 'Missing text or userID',
            });
        }

        res.status(201).json({
            status: 'success',
            data: {
                postID: postID,
                userID: userID,
                text: text
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
}

exports.updatePost = async (req, res) => {
    const { postID } = req.params;
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({
            status: 'fail',
            message: 'A poszt szövege nem lehet üres.',
        });
    }

    const updatedPost = await dataAccessLayer.updatePost(postID, text);

    if (!updatedPost) {
        return res.status(404).json({
            status: 'fail',
            message: 'A megadott poszt nem található.',
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            postID,
            content: text,
        },
    });
};

exports.deletePost = async (req, res) => {
    const { postID } = req.params;

    if (!postID) {
        return res.status(400).json({
            status: 'fail',
            message: 'A bejegyzés ID megadása kötelező.',
        });
    }

    try {
        const post = await dataAccessLayer.getPostById(postID);
        if (!post) {
            return res.status(404).json({
                status: 'fail',
                message: `Nem található bejegyzés az ID: ${postID} alapján.`,
            });
        }

        await dataAccessLayer.deletePost(postID);

        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (error) {
        console.error('Hiba a bejegyzés törlése közben:', error);
        res.status(500).json({
            status: 'error',
            message: 'Hiba történt a bejegyzés törlése közben.',
        });
    }
}

exports.updateComment = async (req, res) => {
    const { postID, commentID } = req.params;
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({
            status: 'fail',
            message: 'A komment szövege nem lehet üres.',
        });
    }

    const updatedComment = await dataAccessLayer.updateComment(commentID, text);

    if (!updatedComment) {
        return res.status(404).json({
            status: 'fail',
            message: 'A megadott komment nem található.',
        });
    }

    res.status(200).json({
        status: 'success',
        data: updatedComment,
    });
};

exports.deleteComment = async (req, res) => {
    const { postID, commentID } = req.params;

    if (!postID) {
        return res.status(400).json({
            status: 'fail',
            message: 'A komment ID megadása kötelező.',
        });
    }

    if (!commentID) {
        return res.status(400).json({
            status: 'fail',
            message: 'A komment ID megadása kötelező.',
        });
    }

    const post = await dataAccessLayer.getPostById(Number(postID));
    if (!post || post.length === 0) {
        return res.status(404).json({
            status: 'fail',
            message: `A megadott poszt (ID: ${postID}) nem található.`,
        });
    }

    try {
        const comment = await dataAccessLayer.getCommentById(Number(commentID));
        if (!comment || comment.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: `A megadott komment (ID: ${commentID}) nem található.`,
            });
        }

        await dataAccessLayer.deleteComment(Number(commentID));

        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (error) {
        console.error('Hiba a komment törlése közben:', error);
        res.status(500).json({
            status: 'error',
            message: 'Hiba történt a komment törlése közben.',
        });
    }
}