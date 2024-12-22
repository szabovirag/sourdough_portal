const express = require('express');
const sourdoughController = require('../controller/sourdoughController');
const userController = require("../controller/userController");

const router = express.Router();

router.use(userController.protect);

router.route('/')
    .get(sourdoughController.getSourdoughPage);
router.route('/id/:id')
    .get(sourdoughController.getSourdoughByID);
router.route('/user/:id')
    .get(sourdoughController.getSourdoughByUserID);
router.route('/')
    .post(sourdoughController.addSourdough);
router.route('/id/:id')
    .patch(sourdoughController.updateSourdough)
    .delete(sourdoughController.deleteSourdough);

router.use(userController.restrictToAdmin);

router.route('/all').get(sourdoughController.getAllSourdoughs)

module.exports = router;