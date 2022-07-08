const router = require('express').Router();
const controller = require('../controllers').SubscriptionController;

router.get('/:id', controller.get);
router.get('/', controller.getAll);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
