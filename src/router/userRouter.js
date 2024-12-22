const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.route('/register')
    .get(userController.getRegistrationPage)
    .post(userController.registerUser)
router.route('/login')
    .get(userController.getLoginPage)
    .post(userController.loginUser)
router.route('/:username')
    .get(userController.getUserByUsername)
router.route('/id/:id')
    .get(userController.getUserByID)

router.use(userController.protect);
router.use(userController.restrictToAdmin);

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.addUser);
router.route('/:id')
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;