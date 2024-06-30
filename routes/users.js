const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    secret: String
});

// Plugin passport-local-mongoose to add authenticate method
userSchema.plugin(plm);

// Create and export the user model
const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
