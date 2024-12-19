const express = require('express');
const sourdoughController = require('../controller/sourdoughController');

const router = express.Router();

router.route('/')
    .get(sourdoughController.getSourdoughPage);
router.route('/all').get(sourdoughController.getAllSourdoughs)
router.route('/:id')
    .get(sourdoughController.getSourdoughByID);
router.route('/')
    .post(sourdoughController.addSourdough);
router.route('/:id')
    .patch(sourdoughController.updateSourdough)
    .delete(sourdoughController.deleteSourdough);

module.exports = router;