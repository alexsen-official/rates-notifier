const router = require('express').Router();
const controller = require('../controllers').RateController;

router.get('/:page', controller.get);

module.exports = router;
