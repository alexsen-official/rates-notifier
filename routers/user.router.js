const router = require('express').Router();
const controller = require('../controllers').UserController;

router.get('/:id', controller.get);
router.get('/', controller.getAll);
router.post('/', controller.create);
router.post('/login', controller.login);
router.put('/', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
