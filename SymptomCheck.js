const mongoose = require('mongoose');

const symptomCheckSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    symptoms: [{ type: String }],
    results: [{ type: String }],
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SymptomCheck', symptomCheckSchema);
