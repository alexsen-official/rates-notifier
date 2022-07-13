const router = require('express').Router();
const controller = require('../controllers').EmailController;

router.post('/send', controller.send);

module.exports = router;
