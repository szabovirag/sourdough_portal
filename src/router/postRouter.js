const express = require('express');
const postController = require('../controller/postController');

const router = express.Router();

router.route('/all')
    .get(postController.getAllPosts);
router.route('/')
    .get(postController.getForumPage)
    .post(postController.addPost);
router.route('/:postID')
    .get(postController.getCommentsByPostID)
    .post(postController.addComment)
    .delete(postController.deletePost);
router.route('/:postID/comments/:commentID')
    .delete(postController.deleteComment)

module.exports = router;