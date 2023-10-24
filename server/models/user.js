const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for todo
const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
});

// Create model for todo
const User = mongoose.model('users', UserSchema);

module.exports = User;