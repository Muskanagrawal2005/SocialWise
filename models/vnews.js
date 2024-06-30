const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: String,
    content: String,
    city: String,
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('News', newsSchema);
