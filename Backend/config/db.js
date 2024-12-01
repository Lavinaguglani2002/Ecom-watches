const mongoose = require('mongoose');

const connectdb = async () => {
    try {
        // Attempt to connect to MongoDB using MONGO_URL from environment variables
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully!");
    } catch (error) {
        // Log detailed error message
        console.error("Database connection failed:", error.message);
    }
};

module.exports = connectdb;
