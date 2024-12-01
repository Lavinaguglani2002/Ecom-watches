const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        lowercase: true, // Ensure slug is in lowercase
        unique: true,    // Ensure slugs are unique
    },
});

module.exports = mongoose.model("Category", categorySchema); // Ensure model name is capitalized
