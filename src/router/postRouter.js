const express = require('express');
const postController = require('../controller/postController');
const userController = require('../controller/userController');

const router = express.Router();

router.route('/all')
    .get(postController.getAllPosts);
router.route('/')
    .get(postController.getForumPage);
router.route('/:postID')
    .get(postController.getCommentsByPostID);

router.use(userController.protect);

router.route('/')
    .post(postController.addPost);
router.route('/:postID')
    .post(postController.addComment);

router.use(userController.restrictToAdmin);

router.route('/:postID')
    .patch(postController.updatePost)
    .delete(postController.deletePost);
router.route('/:postID/comments/:commentID')
    .patch(postController.updateComment)
    .delete(postController.deleteComment);

module.exports = router;