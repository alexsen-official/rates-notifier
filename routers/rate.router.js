const router = require('express').Router();
const controller = require('../controllers').RateController;

router.get('/page/:page', controller.getByPage);
router.get('/year/:year', controller.getByYear);
router.get('/date/:date', controller.getByDate);
router.get('/mailout', controller.mailout);

module.exports = router;
