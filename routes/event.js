const express = require('express');
const router = express.Router();
const Event = require('../models/events');

// Route to get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: -1 });
        res.render('events/index', { events });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Route to show the form to create a new event
router.get('/create', (req, res) => {
    res.render('events/create');
});

// Route to handle the creation of a new event
router.post('/create', async (req, res) => {
    const { title, description, date } = req.body;
    try {
        const newEvent = new Event({
            title,
            description,
            date
        });
        await newEvent.save();
        res.redirect('/events');
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Route to view a specific event
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).send('Event not found');
        }
        res.render('events/view', { event });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Route to join a specific event
router.post('/:id/join', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).send('Event not found');
        }
        event.attendees.push(req.body.name);
        await event.save();
        res.redirect(`/events/${event._id}`);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;

