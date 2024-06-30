const mongoose = require('mongoose');

const volunteeringSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    organizer: { type: String, required: true },
    location: { type: String, required: true },
    city: { type: String, required: true }, // Add the city field
    volunteers: [{
        name: { type: String, required: true },
        email: { type: String, required: true }
    }]
});

module.exports = mongoose.model('Volunteering', volunteeringSchema);
