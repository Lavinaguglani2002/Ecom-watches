const bcrypt = require('bcrypt');

// Function to hash the password
const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
};

// Function to compare the password with the hashed password
const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error('Error comparing password:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
};

module.exports = { hashPassword, comparePassword };
