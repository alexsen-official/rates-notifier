const express = require('express'),
      router = express.Router();

const { UserController } = require('../controllers');

router.get('/:id', UserController.get);
router.get('/', UserController.getAll);
router.post('/', UserController.create);
router.post('/login', UserController.login);
router.put('/', UserController.update);
router.delete('/:id', UserController.delete);

module.exports = router;
