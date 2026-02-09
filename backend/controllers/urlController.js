const { nanoid } = require('nanoid');
const Url = require('../models/Url');

// @desc    Shorten a URL
// @route   POST /api/url/shorten
// @access  Private
const shortenUrl = async (req, res) => {
    try {
        const { originalUrl, customCode } = req.body;

        if (!originalUrl) {
            return res.status(400).json({ message: 'Please provide a URL' });
        }

        // Robust URL validation using built-in URL constructor
        // This handles all valid URLs including complex query params, fragments, etc.
        try {
            new URL(originalUrl);
        } catch (err) {
            // If URL doesn't have protocol, try adding https://
            try {
                new URL('https://' + originalUrl);
            } catch (err2) {
                return res.status(400).json({ message: 'Please provide a valid URL' });
            }
        }

        // Generate or use custom short code
        let shortCode;

        if (customCode) {
            // Validate custom code format (alphanumeric, hyphens, underscores only)
            const customCodePattern = /^[a-zA-Z0-9_-]{3,20}$/;
            if (!customCodePattern.test(customCode)) {
                return res.status(400).json({
                    message: 'Custom code must be 3-20 characters (letters, numbers, hyphens, underscores only)'
                });
            }

            // Check if custom code already exists
            const existingUrl = await Url.findOne({ shortCode: customCode });
            if (existingUrl) {
                return res.status(400).json({ message: 'This custom code is already taken. Please choose another.' });
            }

            shortCode = customCode;
        } else {
            // Generate random short code
            shortCode = nanoid(8);
        }

        const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

        // Create URL document
        const url = await Url.create({
            originalUrl,
            shortCode,
            shortUrl,
            userId: req.user._id,
        });

        res.status(201).json(url);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all URLs for logged in user
// @route   GET /api/url/myurls
// @access  Private
const getMyUrls = async (req, res) => {
    try {
        const urls = await Url.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json(urls);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a URL
// @route   PUT /api/url/:id
// @access  Private
const updateUrl = async (req, res) => {
    try {
        const url = await Url.findById(req.params.id);

        if (!url) {
            return res.status(404).json({ message: 'URL not found' });
        }

        // Check if user owns the URL
        if (url.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Update only allowed fields
        if (req.body.originalUrl) {
            url.originalUrl = req.body.originalUrl;
        }

        const updatedUrl = await url.save();
        res.json(updatedUrl);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a URL
// @route   DELETE /api/url/:id
// @access  Private
const deleteUrl = async (req, res) => {
    try {
        const url = await Url.findById(req.params.id);

        if (!url) {
            return res.status(404).json({ message: 'URL not found' });
        }

        // Check if user owns the URL
        if (url.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await url.deleteOne();
        res.json({ message: 'URL removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Redirect to original URL
// @route   GET /:shortCode
// @access  Public
const redirectUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;

        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json({ message: 'URL not found' });
        }

        // Check if URL has expired
        if (url.expiryDate && new Date() > url.expiryDate) {
            return res.status(410).json({ message: 'URL has expired' });
        }

        // Increment click count
        url.clickCount += 1;

        // Optionally save location data (basic implementation)
        // In production, you would use a service like ipapi.co or geoip-lite
        url.locationData.push({
            country: 'Unknown',
            city: 'Unknown',
            timestamp: new Date(),
        });

        await url.save();

        // Redirect to original URL
        res.redirect(url.originalUrl);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    shortenUrl,
    getMyUrls,
    updateUrl,
    deleteUrl,
    redirectUrl,
};
