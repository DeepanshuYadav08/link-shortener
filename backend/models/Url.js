const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: [true, 'Please provide the original URL'],
        trim: true,
    },
    shortCode: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    shortUrl: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    clickCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiryDate: {
        type: Date,
        default: null,
    },
    locationData: {
        type: [
            {
                country: String,
                city: String,
                timestamp: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        default: [],
    },
});

// Index for faster queries
urlSchema.index({ shortCode: 1 });
urlSchema.index({ userId: 1 });

module.exports = mongoose.model('Url', urlSchema);
