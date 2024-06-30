const express = require('express');
const router = express.Router();
const News = require('../models/vnews');

// Show form to create new news
router.get('/new', (req, res) => {
    res.render('news/new');
});

// Handle creation of new news
router.post('/create', async (req, res) => {
    const { title, content, city } = req.body;
    const news = new News({ title, content, city });
    await news.save();
    res.redirect('/news');
});

// List all news
router.get('/', async (req, res) => {
    const newsList = await News.find();
    res.render('news/news', { newsList });
});

// Show search form
router.get('/search', (req, res) => {
    res.render('news/search');
});

// Handle search
router.post('/search', async (req, res) => {
    const { city } = req.body;
    const newsList = await News.find({ city });
    res.render('news/news', { newsList });
});

// View a particular news article
router.get('/details/:id', async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).send('News not found');
        }
        res.render('news/view', { news });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
