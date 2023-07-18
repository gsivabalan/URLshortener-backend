const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema(
    {
        url: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Url',
        },
        ipAddress: {
            type: String,
            required: true,
        },
        userAgent: {
            type: String,
            required: true,
        },
        referer: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        countryCode: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        continent: {
            type: String,
            required: true,
        },
        latitude: {
            type: String,
            required: true,
        },
        longitude: {
            type: String,
            required: true,
        },
        clickCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Visit', VisitSchema);
