const mongoose = require('mongoose');

const keySchema = mongoose.Schema({
    maxResourceId: { type: String, required: true },
    maxTagId: { type: String, required: true },
});

module.exports = mongoose.model('Key', keySchema);