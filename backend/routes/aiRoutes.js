const router = require('express').Router();
const { analyzeComplaint } = require('../controllers/aiController');

router.post('/analyze', analyzeComplaint);

module.exports = router;