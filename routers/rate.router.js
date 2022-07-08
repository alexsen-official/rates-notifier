const router = require('express').Router();
const controller = require('../controllers').RateController;

router.get('/page/:page', controller.getByPage);
router.get('/year/:year', controller.getByYear);
router.get('/date/:date', controller.getByDate);

module.exports = router;
