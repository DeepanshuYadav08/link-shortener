const express = require('express');
const router = express.Router();
const {
    shortenUrl,
    getMyUrls,
    updateUrl,
    deleteUrl,
} = require('../controllers/urlController');
const { protect } = require('../middleware/auth');

router.post('/shorten', protect, shortenUrl);
router.get('/myurls', protect, getMyUrls);
router.put('/:id', protect, updateUrl);
router.delete('/:id', protect, deleteUrl);

module.exports = router;
