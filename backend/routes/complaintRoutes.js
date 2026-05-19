const router = require('express').Router();
const auth = require('../middleware/auth');
const c = require('../controllers/complaintController');

router.post('/', c.addComplaint);
router.get('/', auth, c.getComplaints);
router.get('/search', auth, c.searchByLocation);
router.put('/:id', auth, c.updateComplaint);
router.delete('/:id', auth, c.deleteComplaint);

module.exports = router;