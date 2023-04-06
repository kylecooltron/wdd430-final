const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true }
});

module.exports = mongoose.model('Tag', tagSchema);