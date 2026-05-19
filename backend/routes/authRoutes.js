const router = require('express').Router();
const a = require('../controllers/authController');

router.post('/signup', a.signup);
router.post('/login', a.login);

module.exports = router;