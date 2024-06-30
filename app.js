// Load environment variables from .env file
require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const expressSession = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const volunteeringRouter = require('./routes/volunteering');
const newsRoutes = require('./routes/news');
const eventRouter = require('./routes/event'); // Import event routes
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mynews';
module.exports = app;
// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware setup
app.use(logger('dev')); // Logger should come early for request logging
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); // Body parser for parsing form data

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Session setup
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || "secret"
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Serialize and deserialize users
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());

// Routes setup
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/volunteering', volunteeringRouter);
app.use('/news', newsRoutes);
app.use('/events', eventRouter);


// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.render('error');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
