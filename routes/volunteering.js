// routes/volunteering.js
const express = require('express');
const router = express.Router();
const Volunteering = require('../models/Volunteering');

// Route to render all volunteering opportunities
router.get('/', async (req, res) => {
    try {
        const volunteerings = await Volunteering.find();
        res.render('index1', { volunteerings });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to render form for creating new volunteering opportunity
router.get('/create', (req, res) => {
    res.render('create');
});

// Route to handle creating new volunteering opportunity
router.post('/create', async (req, res) => {
    try {
        const { title, description, date, organizer, location, city } = req.body;
        const volunteering = new Volunteering({ title, description, date, organizer, location, city });
        await volunteering.save();
        res.redirect('/volunteering');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to render details of a volunteering opportunity
router.get('/details/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const volunteering = await Volunteering.findById(id);
        if (!volunteering) {
            return res.status(404).send('Volunteering opportunity not found');
        }
        res.render('join', { volunteering });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to handle joining a volunteering opportunity
router.post('/join/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const volunteering = await Volunteering.findById(id);
        if (!volunteering) {
            return res.status(404).send('Volunteering opportunity not found');
        }
        volunteering.volunteers.push({ name, email });
        await volunteering.save();
        res.redirect(`/volunteering/details/${id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to search volunteering opportunities by city
router.get('/search', async (req, res) => {
    const { city } = req.query;
    try {
        const volunteerings = await Volunteering.find({ city: new RegExp(city, 'i') });
        res.render('index1.ejs', { volunteerings });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;